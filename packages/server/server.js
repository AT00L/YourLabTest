import 'dotenv/config'
import express, { Router } from "express";
import { MongoClient, ServerApiVersion } from 'mongodb';

const app = express()
const port = process.env.PORT

const client = new MongoClient(process.env.MONGO_DB_URL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function startServer() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");

    const dbName = process.env.MONGO_DB_DATABASE;
    const mongoDbClient = client.db(dbName);
    app.get('/', (req, res) => {
      res.send('Hello World!')
    })

    app.listen(port, () => {
      console.log(`app listening on port ${port}`)
    })
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  }
}

startServer()
