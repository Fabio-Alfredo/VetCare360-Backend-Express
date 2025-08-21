import * as appointment_repository from "../repositories/appointment.repository.js";
import { findPetById } from "./pet.service.js";
import ServiceError from "../utils/errors/service.error.js";
import { ValidationError } from "sequelize";

export const createAppointment = async (appointment, userId) => {
  const t = await appointment_repository.startTransaction();
  try {
    const pet = await findPetById(appointment.pet_id);

    if (pet.userId !== userId) {
      throw new ServiceError(
        403,
        "No tienes permiso para crear una cita para esta mascota"
      );
    }

    const newAppointment = await appointment_repository.save(appointment, t);

    await t.commit();

    return newAppointment;
  } catch (e) {
    console.log(e);
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
