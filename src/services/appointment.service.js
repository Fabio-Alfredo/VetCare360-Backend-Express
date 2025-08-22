import * as appointment_repository from "../repositories/appointment.repository.js";
import { findAllPetsByUser, findPetById } from "./pet.service.js";
import ServiceError from "../utils/errors/service.error.js";
import { ValidationError } from "sequelize";
import { APPOINTMENT_STATUS } from "../utils/constants/appointmentStatus.constant.js";

const MIN_DIFF_IN_MINUTES = 30;

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
    await verifyAppointmentsOwner(appointment, userId);
    
    const newAppointment = await appointment_repository.save(appointment, t);
    newAppointment.setPet(pet);
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


const verifyAppointmentsOwner = async(appointment, userId)=>{
  try{
    const pets = await findAllPetsByUser(userId);
    const petsIds = pets.map(pet => pet.id);

    const minDate = new Date(new Date(appointment.date_time).getTime() - MIN_DIFF_IN_MINUTES * 60 * 1000);
    const maxDate = new Date(new Date(appointment.date_time).getTime() + MIN_DIFF_IN_MINUTES * 60 * 1000 -1);
    console.log(minDate, maxDate);
    const appointments = await appointment_repository.findAllByPetsAndStatusAndDate(petsIds, APPOINTMENT_STATUS.PENDING, minDate, maxDate);
    
    if(appointments.length > 0){
      throw new ServiceError(
        400,
        `La cita debe tener una diferencia de al menos ${MIN_DIFF_IN_MINUTES} minutos`
      );
    }

  }catch(e){
    if(e instanceof ValidationError){
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
}