import * as role_repository from "../repositories/role.repository.js";
import { ValidationError } from "sequelize";
import ServiceError from "../utils/errors/service.error.js";

export const findAllRolesById = async (ids) => {
  try {
    const roles = await role_repository.findAllByIds(ids);

    if (!roles || roles.length !== ids.length)
      throw new ServiceError(409, "Uno o más roles son inválidos");

    return roles;
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

export const findById = async (id) => {
  try {
    const role = await role_repository.findById(id);

    if (!role) throw new ServiceError(404, "Rol no encontrado");

    return role;
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
