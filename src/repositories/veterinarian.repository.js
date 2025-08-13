import Veterinarian from "../models/Veterinarian.js";

export const save = async (veterinarian) => {
  const newVeterinaria = await Veterinarian.create(veterinarian);
  return newVeterinaria;
}

export const findByUserId = async (userId)=>{
  const veterinarian = await Veterinarian.findOne({ where: { userId } });
  return veterinarian;
}
