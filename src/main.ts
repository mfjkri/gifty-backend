import express from "express";

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
  const modelDefiners = [
    require("./models/avatar"),
    require("./models/user"),
    require("./models/person"),
  ];
  for (const modelDefiner of modelDefiners) {
    modelDefiner.init();
  }
}

export default Main;
