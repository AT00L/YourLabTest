import 'dotenv/config'
import express, { Router } from "express";
import cors from 'cors';
import { MongoClient, ServerApiVersion } from 'mongodb';
import product from "./product/product.controller.js";

let db = null

export async function mongoInatialize() {
  if (!db) {
    const client = new MongoClient(process.env.MONGO_DB_URL, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
    await client.connect();
    const dbName = process.env.MONGO_DB_DATABASE;
    console.log("Connected to MongoDB!");
    db = client.db(dbName);
  }
  return db
}

const app = express()
const port = process.env.PORT

app.use(cors({
  origin: process.env.ALLOWED_DOMAINS?.split(',').map(d => d.trim())
}))

app.use('/product', product)

async function startServer() {
  try {
    mongoInatialize()
    app.listen(port, () => {
      console.log(`app listening on port ${port}`)
    })
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  }
}

startServer()
