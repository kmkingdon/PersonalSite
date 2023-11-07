import { MongoClient, ServerApiVersion } from "mongodb";

const connectionString = "mongodb+srv://kmkingdon:test@cluster0.399gspe.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(connectionString, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let conn;
try {
  conn = await client.connect();
} catch(e) {
  console.error(e);
}

let db = conn?.db("kmkingdon");

export default db;