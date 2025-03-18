import { MongoClient, Db } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017";
const DB_NAME = process.env.DB_NAME || "honoDB";

const client = new MongoClient(MONGO_URI);
let db: Db;

export const connectDB = async () => {
  if (!db) {
    await client.connect();
    db = client.db(DB_NAME);
    console.log(`✅ MongoDB connecté : ${DB_NAME}`);
  }
  return db;
};
