import User from "../models/user.js";

export const startTransaction = async()=>{
  const t = await User.sequelize.transaction();
  return t;
}

export const save = async (user, transaction) => {
  const newUser = await User.create(user, { transaction });
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
