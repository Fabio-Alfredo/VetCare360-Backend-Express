import * as pet_repository from "../repositories/pet.repository.js";
import { findUserById } from "./user.service.js";
import { ValidationError } from "sequelize";
import ServiceError from "../utils/errors/service.error.js";
import { findById } from "../repositories/user.repository.js";

export const registerPet = async (petData, authUser) => {
  const t = await pet_repository.startTransaction();
  try {
    const user = await findUserById(authUser.id);
    const newPet = await pet_repository.createPet(petData);
    await newPet.setUser(user.id);

    await t.commit();
    return newPet;
  } catch (e) {
    await t.rollback();
    if (e instanceof ValidationError) {
      throw new ServiceError(
        400,
        e.errors.map((err) => err.message).join(", ")
      );
    }

    throw new ServiceError(
      e.code || 500,
      e.message || "Error interno del servidor"
    );
  }
};

export const findAllPets = async (page, limit) => {
  try {
    const { totalPets, totalPages, currentPage, pets } =
      await pet_repository.getPets(page, limit);
    return { totalPets, totalPages, currentPage, pets };
  } catch (e) {
    if (e instanceof ValidationError) {
      throw new ServiceError(
        400,
        e.errors.map((err) => err.message).join(", ")
      );
    }

    throw new ServiceError(
      e.code || 500,
      e.message || "Error interno del servidor"
    );
  }
};

export const findPetById = async (id) => {
  try {
    const pet = await pet_repository.getPetById(id);
    if (!pet) {
      throw new ServiceError(404, "Mascota no encontrada");
    }
    return pet;
  } catch (e) {
    if (e instanceof ValidationError) {
      throw new ServiceError(
        400,
        e.errors.map((err) => err.message).join(", ")
      );
    }

    throw new ServiceError(
      e.code || 500,
      e.message || "Error interno del servidor"
    );
  }
};

export const findAllPetsByUser = async (userId) => {
  try {
    const user = await findUserById(userId);

    const pets = await pet_repository.getPetByUserId(user.id);
    return pets;
  } catch (e) {
    if (e instanceof ValidationError) {
      throw new ServiceError(
        400,
        e.errors.map((err) => err.message).join(", ")
      );
    }

    throw new ServiceError(
      e.code || 500,
      e.message || "Error interno del servidor"
    );
  }
};

export const updatePet = async (id, petData, ownerId) => {
  const t = await pet_repository.startTransaction();
  try {
    const pet = await findPetById(id);

    if (ownerId != pet.userId) {
      throw new ServiceError(
        403,
        "No tienes permiso para actualizar esta mascota"
      );
    }

    for (const key of ["name", "species", "rasa", "sexo", "date_of_birth"]) {
      if (petData[key] !== undefined) {
        pet[key] = petData[key];
      }
    }

    await pet.save({ transaction: t });
    await t.commit();
    return pet;
  } catch (e) {
    await t.rollback();
    if (e instanceof ValidationError) {
      throw new ServiceError(
        400,
        e.errors.map((err) => err.message).join(", ")
      );
    }

    throw new ServiceError(
      e.code || 500,
      e.message || "Error interno del servidor"
    );
  }
};
