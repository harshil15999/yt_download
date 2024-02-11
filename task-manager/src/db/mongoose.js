import mongoose from "mongoose";
import pkg from "mongodb";
const { MongoClient } = pkg;

let client;
let count = 0;
const connectToMongoDB = async () => {
  try {
    let database;
    if (!client) {
      client = new MongoClient(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      await client.connect();
      database = client.db(process.env.MONGODB_DATABASE);
      console.log("Connected to MongoDB");
    }
    return [client, database];
  } catch (error) {
    console.error(process.env.MONGODB_URL);
    if (count <= 5) {
      console.log("Tryin for connecting to database", count);
      setTimeout(connectToMongoDB, 2000);
      count = count + 1;
    } else {
      console.log("COUNT", count);
      console.log("DIDI");
      throw error;
    }
    console.error("Error connecting to MongoDB:retry after 2 seconds.", error);
  }
};

export default {
  connectToMongoDB,
};
