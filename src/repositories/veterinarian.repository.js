import Veterinarian from "../models/Veterinarian.js";

export const save = async (veterinarian) => {
  const newVeterinaria = await Veterinarian.create(veterinarian);
  return newVeterinaria;
}
