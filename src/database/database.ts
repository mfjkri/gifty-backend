import { Sequelize } from "sequelize";
import { getConfig } from "../config/config";

let db: Sequelize;

export async function connectDB() {
  const config = getConfig();
  db = connect({
    Hostname: config.DBHostname,
    Port: config.DBPort,
    Name: config.DBName,
    User: config.DBUsername,
    Password: config.DBPassword,
  });

  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  return db;
}

export function getDB() {
  return db;
}

type Config = {
  Hostname: string;
  Port: number;
  Name: string;
  User: string;
  Password: string;
};

function connect(config: Config) {
  const { Hostname, Port, Name, User, Password } = config;
  const sequelize = new Sequelize(Name, User, Password, {
    host: Hostname,
    port: Port,
    dialect: "postgres",
  });
  return sequelize;
}

export default getDB;
