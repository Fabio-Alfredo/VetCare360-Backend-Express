import db from "../models/index.js";

export const startTransaction = async () => {
  const transaction = await db.sequelize.transaction();
  return transaction;
};

export const save = async (veterinarian, transaction) => {
  const newVeterinaria = await db.Veterinarian.create(veterinarian, { transaction });
  return newVeterinaria;
}

export const findByUserId = async (userId)=>{
  const veterinarian = await db.Veterinarian.findOne({ where: { userId } });
  return veterinarian;
}

export const findAll = async ()=>{
  const veterinarians = await db.Veterinarian.findAll(
    {
      include: [
        {
          model: User,
          attributes: ["id", "name", "email"]
        }
      ]
    }
  );
  return veterinarians;
}