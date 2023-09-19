import express from "express";
import "express-async-errors";
import cors from "cors";
import router from "./routes";
import { connectDb, disconnectDB } from "./database";
import { Express } from "express";

const app = express();
app
  .use(cors())
  .use(express.json())
  .use(router)

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;