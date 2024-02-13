import { Router } from "express";
const router = new Router();

const fetch_data=async(req)=>{
  try {
    
    const sortBy = {};
    let parts = null;
    console.log(req.query.query)
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

    const collection = mongoClient.collection(process.env.MONGODB_COLLECTION);
    // Define your query parameters
    console.log(req.query)
    const skip = parseInt(req.query.skipTo) || 0;
    const limit = parseInt(req.query.limit) || 0;
    console.log("LIMIT is",limit)
    const filter = {
      $text: {
        $search: req.query.query, 
      },
    };
    const projection = {
      '_id': 1, 
      'snippet': 1
    };
    const sort = {
      'snippet.publishTime': sortBy[parts[0]],
    };

    const coll = collection;
    const cursor = coll.find(filter, { projection,sort, skip, limit });
    const result = await cursor.toArray();
    // console.log("results are ",result)
    return result
  } catch(err){
    throw new Error(err)
  }
}



// GET /search?query=String
// GET /search?limit=10&skip=20
// GET /search?sortBy=publishTime:1
router.get("/search", async (req, res) => {
  try{
    console.log("GET request received",req.params)
    const results=await fetch_data(req)
    res.status(200).send(results);

  } catch (e) {
    if(e.code==27){
      // Index Not found 
      try{
        const indexFields = { 'snippet.title': 'text', 'snippet.description': 'text' };

        // Create the text index
        const indexName = await collection.createIndex(indexFields);
        console.log(`Text index created successfully. Index name: ${indexName}`);
        res.status(200).send(await fetch_data(req))
        


      } catch(err){
        console.err("Error in creating text index",err)
        
      }
    }
    console.log(e);
    res.status(500).send(e);
  }
});

export default router;
