import { Router } from "express";
const router = new Router();

// GET /search?query=String
// GET /search?limit=10&skip=20
// GET /search?sortBy=publishTime:desc
router.get("/search", async (req, res) => {
  try {
    const match = {};
    const sortBy = {};
    let parts = null;

    // Specify the database and collection
    const mongoClient = req.app.get("mongoClient");

    if (req.query.sortBy) {
      parts = req.query.sortBy.split(":");
      sortBy[parts[0]] = parts[1] === "desc" ? -1 : 1;
    } else {
      parts = [];
      parts.push("publishTime");
      sortBy["publishTime"] = 1;
    }

    const collection = mongoClient.collection(process.env.CollectionName);
    // Define your query parameters

    const filter = {
      $text: {
        $search: req.query.query,
      },
    };
    const projection = {
      _id: 1,
      snippet: 1,
    };
    const sort = {
      "snippet.publishTime": sortBy[parts[0]],
    };
    const skip = req.query.skipTo || 0;
    const limit = req.query.limit || 0;

    // Perform the query
    const result = await collection
      .find(filter, { projection, sort, skip, limit })
      .toArray();
    res.status(200).send(result);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

export default router;
