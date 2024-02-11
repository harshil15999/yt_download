import asyncio
import time
import aiohttp
import motor.motor_asyncio
import configparser
import argparse
import time
import re


# TOOD: Fetch new api keys on expiration
# TODO: bulk writes to increase performance
# TODO: Async database writes check that

class YoutubeService:
    def __init__(self):
        self.MAX_RETRIES = 5
        self.DB_CONNECTION_RETRY = 10  #Time interval in seconds
        self.DB = None  # Value of db connection stored here
        self.client = None
        self.config_values: dict  #Stores all db connection details and api keys and all paramters in .ini file
        self.API_EXPIRY_COUNT=0
    def connect_to_db(self,
                      count_of_retry,
                      url=None,
                      database=None
                      ):
        try:
            url = self.config_values["MONGODB_URL"] if url is None else url
            database = self.config_values["MONGODB_DATABASE"] if database is None else database
            # Connect to MongoDB
            # Update the connection string as needed
            self.client = motor.motor_asyncio.AsyncIOMotorClient(url)
            # Create or select a database
            self.DB = self.client[database]
            print("Connected to MongoDB")
            print(self.DB)
        except Exception as e:
            if (self.MAX_RETRIES == count_of_retry):
                raise ValueError("Cannot connect to DB,shutting the program down")
                sys.exit(1)
            time.sleep(self.DB.DB_CONNECTION_RETRY)
            print("Retrying in connection to db")
            self.connect_to_db(count_of_retry=count_of_retry + 1)

    def fetch_api_keys(self):
        #This functcion will query a db and return fresh api tokens
        return self.config_values['API_KEY']

    async def save_to_mongo(self, json_data, query, collection_name=None):
        
        try:

            collection_name = self.config_values["MONGODB_COLLECTION"] if collection_name is None else collection_name
            print("Collection Name",self.DB[collection_name])
            # Create or select a collection
            collection = self.DB[collection_name]
            # Insert JSON data into the collection

            result= await collection.insert_many(json_data)
            return result
        except Exception as e:
            return e

    async def download_data(self, session, query):
        url = f"https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelType=any&q={query}&type=video&videoCaption=any&videoType=any&key={self.config_values['API_KEY']}"
        url = re.sub(r'(&key=)"([^"]*)"', r'\1\2', url)

        try:
            async with session.get(url) as response:
                print("Read {0} from {1}".format(response.status, response))
                if response.status == 200:
                    self.API_EXPIRY_COUNT=0
                    data = await response.json()
                    items = data.get("items", [])
                   
                    try:
                        x=await self.save_to_mongo(json_data=items, query=query)
                        print(x)
                        print("Succesfully saved data",query)
                    except Exception as e:
                        print("Error while saving data ",e)
                if response.status == 403:
                    if(self.API_EXPIRY_COUNT<5):
                        self.API_EXPIRY_COUNT=self.API_EXPIRY_COUNT+1
                        self.config_values['API_KEY']=self.fetch_api_keys()
                        self.download_data(session, query)
                    else:
                        raise ValueError("Fresh API keys cannot be fetched")



                else:
                    print("Failed to search YouTube:", response)
        except Exception as e:
            print("Error searching YouTube:", e)

    async def download_query_data(self, QUERIES):
        # async with aiohttp.ClientSession(headers=headers) as session:
        async with aiohttp.ClientSession() as session:
            tasks = []
            for query in QUERIES:
                task = asyncio.ensure_future(self.download_data(session, query))
                tasks.append(task)
            await asyncio.gather(*tasks, return_exceptions=True)


def ParseConfig(path: str, env: str):
    # Parses all the conenction details and API KEYS
    try:
        config = configparser.ConfigParser()
        config.read(path)
        config = config[env]
        return config
    except Exception as e:
        print("Failed to read config file or staging name is wrong", e)


def ParseCommandLine():
    parser = argparse.ArgumentParser(description="Parse values from the command line")
    # Add arguments
    parser.add_argument("--env", help="Environment to run in", required=True)
    parser.add_argument("--count", help="Frequency of calling", default=1)
    parser.add_argument("--interval", type=int, help="Time Interval in seconds", default=10)
    # Parse the command-line arguments
    args = parser.parse_args()
    return args


if __name__ == "__main__":

    path = "./config/youtube_sevice.ini"
    QUERIES = [
        "chirag"
    ]
    youtube_service = YoutubeService()
    args = ParseCommandLine()
    config_values = ParseConfig(path, str(args.env))
    youtube_service.config_values = config_values

    api_key = youtube_service.config_values['API_KEY']
    count = int(args.count)
    counter = 0
    try:
        youtube_service.connect_to_db(5)
    except Exception as e:
        raise ValueError("Could not connect to DB")

    while (count > 0 and counter < count):
        start_time = time.time()
        asyncio.run(youtube_service.download_query_data(QUERIES))
        duration = time.time() - start_time

        print(f"Downloaded {len(QUERIES)} QUERIES in {duration} seconds")

        counter = counter + 1
        time.sleep(args.interval)

    # Close the MongoDB connection
    if (youtube_service.client != None):
        youtube_service.client.close()
        print("Closed the DB")
    print("Finished execution of program")
