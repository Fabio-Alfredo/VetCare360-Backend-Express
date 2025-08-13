import Role from "../models/Role.js";
import { Op } from "sequelize";

export const findAllByIds = async (ids) => {
  const roles = await Role.findAll({
    where: {
      id: {
        [Op.in]: ids
      }
    }
  })
  return roles;
}

export const findById = async (id) => {
  const role = await Role.findByPk(id);
  return role;
};