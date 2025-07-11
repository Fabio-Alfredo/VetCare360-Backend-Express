import { Sequelize } from "sequelize";
import { currentConfig } from "../common.configuration/config.js";

const sequelize = new Sequelize({
  database: currentConfig.db.name,
  username: currentConfig.db.user,
  password: currentConfig.db.pass,
  dialect: currentConfig.db.dialect,

  dialectOptions: {
    socketPath: currentConfig.db.host, // For MySQL socket connection
  }
})

export default sequelize;
