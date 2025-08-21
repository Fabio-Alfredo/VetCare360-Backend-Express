import * as appointment_services from "../services/appointment.service.js";
import createHttpError from "http-errors";
import responseHandler from "../handlers/res.handler.js";

export const createAppointment = async (req, res, next) => {
  try {
    const { date_time, reason, notes = "", pet_id } = req.body;
    const user = req.user;
    const newAppointment = await appointment_services.createAppointment({
      date_time,
      reason,
      notes,
      pet_id
    }, user.id);
    responseHandler(res, 201, "Cita creada con éxito", newAppointment);
  } catch (e) {
    next(createHttpError(e.code, e.message));
  }
};
