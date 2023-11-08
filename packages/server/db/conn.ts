import { MongoClient, ServerApiVersion } from "mongodb";

const connectionString = process.env.MONGO_URI || '';

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