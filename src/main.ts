import express from "express";

import { connectDB, getDB } from "./database/database";
import { getConfig, loadEnv } from "./config/config";
import initRoutes from "./routes/routes";
import migrateModels from "./models/models";

async function Main() {
  await init();

  const db = getDB();
  const config = getConfig();
  const expressApp = express();

  expressApp.use(express.json());

  initRoutes(expressApp);

  db.sync().then(() =>
    expressApp.listen(config.ServerPort, () => {
      console.log(
        `[server]: Server is running at http://localhost:${config.ServerPort}`
      );
    })
  );
}

export async function init() {
  loadEnv();
  await initDB();
}

async function initDB() {
  await connectDB();
  await migrateModels();
}

export default Main;
