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

    process.on("SIGINT", async () => {
      await client.close();
      console.log("MongoDB connection closed");
      process.exit(0);
    });
  } catch (error) {
    console.error("Error closing  the application:", error);
    process.exit(1);
  }
};

await startApplication();
app.use(express.json());

app.use(taskRouter, sanitize.sanitizeQueryParams);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
