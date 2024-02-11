import mongoose from "mongoose";
import pkg from "mongodb";
const { MongoClient } = pkg;

let client;

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
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

const db = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
    });
    console.log("Mongoose connected");
  } catch (error) {
    console.log(
      "[Error] MongoDB did not get connected due to issue " + error.message
    );
    process.exit(1);
  }
};

//TODO: FIGURE OUT HOW TO WRITE THIS
// db.connection.on('error', function(err){
//     console.error("connection error;", err);
// });

export default {
  db,
  connectToMongoDB,
};
