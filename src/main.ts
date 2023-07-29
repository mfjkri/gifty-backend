import express from "express";
import path from "path";
import fs from "fs";

import { connectDB, getDB } from "./database/database";
import { getConfig, loadEnv } from "./config/config";
import initRoutes from "./routes/routes";

const Main = async () => {
  init();

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
};

function init() {
  loadEnv();
  initDB();
}

function initDB() {
  connectDB();
  initModels();
}

function initModels() {
  const modelsDir = path.join(__dirname, "models");
  const modelFiles = fs.readdirSync(modelsDir);
  const modelDefiners = modelFiles
    .filter((file) => file.endsWith(".ts"))
    .map((file) => require(path.join(modelsDir, file)));

  for (const modelDefiner of modelDefiners) {
    modelDefiner.init();
  }
}

export default Main;
