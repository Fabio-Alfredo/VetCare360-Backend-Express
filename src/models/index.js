// src/configurations/db.configuration/registerModels.jsAdd commentMore actions
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sequelize from "../configurations/db.configuration/sequelize.config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const registerModels = async () => {
  const modelsDir = path.join(__dirname, "../models");

  const files = fs.readdirSync(modelsDir);

  for (const file of files) {
    if (file.endsWith(".js")) {
      await import(path.join(modelsDir, file));
    }
  }

  const { models } = sequelize;

  Object.values(models).forEach((model) => {
    if (typeof model.association === "function") {
      model.association(models);
    }
  });
};
