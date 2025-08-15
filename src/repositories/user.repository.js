import db from "../models/index.js";

export const startTransaction = async()=>{
  const t = await db.sequelize.transaction();
  return t;
}

export const save = async (user, transaction) => {
  const newUser = await db.User.create(user, { transaction });
  return newUser;
}

export const findByemail = async (email) => {
  const user = await db.User.findOne({
    where: { email },
    include:[
      {model: db.Role, attributes: ["id", "name"]}
    ]
   })
  return user;
}

export const findById = async (id) => {
  const user = await db.User.findByPk(id);
  return user;
}

export const findAll = async () => {
  const users = await db.User.findAll();
  return users;
}
