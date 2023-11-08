import express, {Request, Response} from "express";
// @ts-ignore
import { MONGO_COLLECTIONS, audienceCategories, skillsCategories, aboutParams } from "../common/common.ts";
// @ts-ignore
import { generatePrompt, getMongoData } from "../services/services.ts";
// @ts-ignore
import { createAboutPrompt } from "../utils/utils.ts";

const router = express.Router();


router.get("/workExperience", async (_req:Request, res:Response) => {
  let results = await getMongoData([MONGO_COLLECTIONS.WORKEXPERIENCE]);
  res.send(results).status(200);
});

router.get("/education", async (_req:Request, res:Response) => {
  let results = await getMongoData([MONGO_COLLECTIONS.EDUCATION]);
  res.send(results).status(200);
});

router.post("/about", async (req:Request, res:Response) => {
  const aboutParams: aboutParams = req.body;
  const data = await getMongoData(["education", "workExperience", "skills", "history"]);
  const prompt = createAboutPrompt({data, type:"about", ...aboutParams})
  const text = generatePrompt(prompt);
  res.send(text).status(200);
});

router.post("/home", async (req:Request, res:Response) => {
  const aboutParams: aboutParams = req.body;
  const data = await getMongoData(["education", "workExperience", "skills", "history"]);
  const prompt = createAboutPrompt({data, type:"home", ...aboutParams})
  res.send(prompt).status(200);
});

// // Fetches the latest posts
// router.get("/latest", async (req, res) => {
//   let collection = await db.collection("posts");
//   let results = await collection.aggregate([
//     {"$project": {"author": 1, "title": 1, "tags": 1, "date": 1}},
//     {"$sort": {"date": -1}},
//     {"$limit": 3}
//   ]).toArray();
//   res.send(results).status(200);
// });

// // Get a single post
// router.get("/:id", async (req, res) => {
//   let collection = await db.collection("posts");
//   let query = {_id: ObjectId(req.params.id)};
//   let result = await collection.findOne(query);

//   if (!result) res.send("Not found").status(404);
//   else res.send(result).status(200);
// });

// // Add a new document to the collection
// router.post("/", async (req, res) => {
//   let collection = await db.collection("posts");
//   let newDocument = req.body;
//   newDocument.date = new Date();
//   let result = await collection.insertOne(newDocument);
//   res.send(result).status(204);
// });

// // Update the post with a new comment
// router.patch("/comment/:id", async (req, res) => {
//   const query = { _id: ObjectId(req.params.id) };
//   const updates = {
//     $push: { comments: req.body }
//   };

//   let collection = await db.collection("posts");
//   let result = await collection.updateOne(query, updates);

//   res.send(result).status(200);
// });

// // Delete an entry
// router.delete("/:id", async (req, res) => {
//   const query = { _id: ObjectId(req.params.id) };

//   const collection = db.collection("posts");
//   let result = await collection.deleteOne(query);

//   res.send(result).status(200);
// });

export default router;