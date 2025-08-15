import db from "../models/index.js";
import { Op } from "sequelize";

export const findAllByIds = async (ids) => {
  const roles = await db.Role.findAll({
    where: {
      id: {
        [Op.in]: ids 
      }
    }
  })
  return roles;
}

export const findById = async (id) => {
  const role = await db.Role.findByPk(id);
  return role;
};