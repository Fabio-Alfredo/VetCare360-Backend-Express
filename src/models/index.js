import fs from "fs";
import path from "path";
import { Sequelize } from "sequelize";
import { fileURLToPath } from "url";
import sequelize from "../configurations/db.configuration/sequelize.config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = {};

// Leemos todos los archivos .js en la carpeta models
const files = fs
  .readdirSync(__dirname)
  .filter(
    (file) =>
      file !== path.basename(__filename) && file.endsWith(".js")
  );

// Importamos los modelos dinámicamente
for (const file of files) {
  const modelModule = await import(`./${file}`);
  const model = modelModule.default; 
  db[model.name] = model;
}

// Configuramos las asociaciones
for (const modelName of Object.keys(db)) {
  if (typeof db[modelName].association === "function") {
    db[modelName].association(db);
  }
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
