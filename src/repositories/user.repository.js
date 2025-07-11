import { Where } from "sequelize/lib/utils";
import User from "../models/User";
import { where } from "sequelize";

export const save = async (user) => {
  const newUser = await User.create(user);
  return newUser;
}

export const findByemail = async (email) => {
  const user = await User.findOne({ where: { email } })
  return user;
}

export const findById = async (id) => {
  const user = await User.findByPk(id);
  return user;
}

export const findAll = async () => {
  const users = await User.findAll();
  return users;
}
