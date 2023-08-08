import dotenv from "dotenv";

type Config = {
  ServerPort: number;
  JWTSecretKey: string;
  DBHostname: string;
  DBPort: number;
  DBName: string;
  DBUsername: string;
  DBPassword: string;
  EmailUsername: string;
  EmailPassword: string;
};

export function loadEnv() {
  dotenv.config();
  validateEnv();
}

export function getConfig(): Config {
  const {
    SERVER_PORT,

    JWT_SECRET_KEY,

    DB_HOSTNAME,
    DB_PORT,
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,

    EMAIL_USERNAME,
    EMAIL_PASSWORD,
  } = process.env;
  return {
    ServerPort: parseInt(SERVER_PORT || "8080"),

    JWTSecretKey: JWT_SECRET_KEY || "secret",

    DBHostname: DB_HOSTNAME || "localhost",
    DBPort: parseInt(DB_PORT || "5432"),
    DBName: DB_NAME || "postgres",
    DBUsername: DB_USERNAME || "postgres",
    DBPassword: DB_PASSWORD || "postgres",

    EmailUsername: EMAIL_USERNAME || "",
    EmailPassword: EMAIL_PASSWORD || "",
  };
}

function validateEnv() {
  const {
    SERVER_PORT,
    DB_HOSTNAME,
    DB_PORT,
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
    JWT_SECRET_KEY,
  } = process.env;

  if (!SERVER_PORT) {
    throw new Error("SERVER_PORT is not defined");
  }

  if (!DB_HOSTNAME) {
    throw new Error("DB_HOSTNAME is not defined");
  }
  if (!DB_PORT) {
    throw new Error("DB_PORT is not defined");
  }
  if (!DB_NAME) {
    throw new Error("DB_NAME is not defined");
  }
  if (!DB_USERNAME) {
    throw new Error("DB_USERNAME is not defined");
  }
  if (!DB_PASSWORD) {
    throw new Error("DB_PASSWORD is not defined");
  }
  if (!JWT_SECRET_KEY) {
    throw new Error("JWT_SECRET_KEY is not defined");
  }
}
