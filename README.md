# yt_download

# Application Overview

## Description
This application is designed to fetch the latest videos sorted in reverse chronological order of their publishing date-time from YouTube for a given tag/search query in a paginated response.

## Components

### 1. Database
The application relies on a MongoDB database to store and manage data. Key features of the database include:

- **Database Type**: MongoDB
- **Data Model**:

    #### Metadata Collection
    
    Stores all the metadata for the videos fetched by the microservice. Indexes are present on text and description of the video.

    #### API Keys Collection (To be made)
    - **Purpose**: 
    Will store all the API keys to be used by the application. It will have the following schema:

    - `API key`: Unique alphanumeric text
    - `ExpiredAt`: Timestamp when the quota got exhausted
    - `CostLeft`: Number of units left for this query
[decribe the role of the database in the application]

### 2. Python Script
The application utilizes a Python script for calling search API. Key aspects of the Python script include:

- **Script Name**: yt_service.py
- **Functionality**: Calls the youtube search api and saves in the database
- **Dependencies**: The database has to be up for it to store the data.

TO DO:
API KEY ROTATION:
1. If we have exhaunsted the quota for the current key then we will store its time stamp and fetch the next key.
2. The logic to fetch next key, Any key which has been not used for the current day and has the maximuum of CostLeft.
3. If we donot want our application to get quota expired error, then for each query we will calculate the units that could be used and based on that we will decide whether to use the current API key or not.
3.1 If it is less we will try matching the expected cost < CostLeft for some other API Key   

### 3. Node.js Backend
The backend of the application is developed using Node.js and is responsible for fetching the data and showing it to the users 


- **Framework**: Express
- **API Endpoints**: /search
- **Middleware**: A middleware to sanitize the query has been used
- **Interactions with the Database**: The application interacts with the backend using the native db drivers

TO DO:
1. While fetching the youtube videos for each video id only send back the data with latest timestamp.


### 4.  Dashboard

It is a dashboard responsible to call the node js application and display the json results.



##### Installation
a. Open VSCODE with the docker extension 
1. Starting the database and node js application : right click on the docker-compose.yml and it will bring up the database and node application
2. Start the yt_service to populate db data - go into the folder yt_service and run the docker-compose.yml file .
2.1 Login to docker-desktop and see the logs for this image and validate data is stored
2.2 Check the db if the data is there 

3. Use postman to query the node application 
3.1 Starting the dashboard - Go to the folder yt_dashboard and run the command ``` streamlit run app1.py```

