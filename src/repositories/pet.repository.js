import Pet from "../models/Pet.js";

export const startTransaction = async () => {
  return await Pet.sequelize.transaction();
};

export const createPet = async (petData, transaction) => {
  const pet = await Pet.create(petData, { transaction });
  return pet;
};

export const getPets = async (page = 1, limit = 10) => {
  const { count, rows } = await Pet.findAndCountAll({
    offset: (page - 1) * limit,
    limit: limit,
  });
  const totalPages = Math.ceil(count / limit);
  return { totalPets: count, totalPages, currentPage: page, pets: rows };
};

export const getPetById = async (id) => {
  const pet = await Pet.findByPk(id);
  return pet;
};

export const getPetByUserId = async (userId) => {
  const pets = await Pet.findAll({ where: { userId } });
  return pets;
};
