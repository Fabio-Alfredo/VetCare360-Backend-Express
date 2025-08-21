import { Router } from "express";
import * as appointment_controller from "../controllers/appointment.controller.js";
import * as security from "../middlewares/security.middleware.js";
import * as appointment_validator from "../utils/validator/appointment.validator.js";
import { validateRequest } from "../middlewares/validator.middleware.js";

const appointmentRoute = Router();

appointmentRoute.post(
  "/create",
  security.authMiddleware,
  appointment_validator.createAppointmentValidator,
  validateRequest,
  appointment_controller.createAppointment
);

export default appointmentRoute;
