import Veterinarian from "../models/Veterinarian.js";
import User from "../models/user.js";

export const save = async (veterinarian) => {
  const newVeterinaria = await Veterinarian.create(veterinarian);
  return newVeterinaria;
}

export const findByUserId = async (userId)=>{
  const veterinarian = await Veterinarian.findOne({ where: { userId } });
  return veterinarian;
}

export const findAll = async ()=>{
  const veterinarians = await Veterinarian.findAll(
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