import { Sequelize } from "sequelize";
import config from "./config";

const db = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: "localhost",
    dialect: "postgres",
    port: config.development.port,
  }
);

db.authenticate()
  .then(() => {
    console.log("Connection successful!");
  })
  .catch((err) => {
    console.log(err);
  });

export default db;
