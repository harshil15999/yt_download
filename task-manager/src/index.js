import express, { json } from "express";
import taskRouter from "../src/routers/task.js";
const app = express();
const port = process.env.PORT || 3000;
import _ from "../src/db/mongoose.js";
import sanitize from "../src/middleware/auth.js";

const startApplication = async () => {
  try {
    const [client, database] = await _.connectToMongoDB();
    app.set("mongoClient", database);
    // Your application logic here, using the 'mongoClient' instance
    // Example: Close the MongoDB connection when the application exits
    process.on("SIGINT", async () => {
      await client.close();
      console.log("MongoDB connection closed");
      process.exit(0);
    });
  } catch (error) {
    console.error("Error closing  the application:", error);
  }
};

await startApplication();
app.use(json());
app.use(taskRouter, sanitize.sanitizeQueryParams);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
