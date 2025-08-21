import * as user_repository from "../repositories/user.repository.js";
import { ValidationError } from "sequelize";
import ServiceError from "../utils/errors/service.error.js";

export const findUserById = async (id) => {
  try {
    const user = await user_repository.findById(id);

    if (!user) throw new ServiceError(404, "Usuario no encontrado");

    return user;
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

export const findUserAndRolesById = async (id) => {
  try {
    const { user, roles } = await user_repository.findUserAndRoles(id);
    if (!user) throw new ServiceError(404, "Usuario no encontrado");
    const rolesId = roles.map((r) => r.id);

    return { user, rolesId };
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

export const updateUser = async (id, userData) => {
  const t = await user_repository.startTransaction();
  try {

    const user = await findUserById(id);
    for(const key of ["name", "email", "phone", "lastName"]) {
      if(userData[key] !== undefined) {
        user[key] = userData[key];
      }
    }

    await user.save({ transaction: t });
    await t.commit();

    return;
  } catch (e) {
    await t.rollback();
    if (e instanceof ValidationError) {
      throw new ServiceError(
        400,
        e.errors.map((err) => err.message).join(", ")
      );
    }
    console.log(e);
    throw new ServiceError(
      e.code || 500,
      e.message || "Error interno del servidor"
    );
  }
};
