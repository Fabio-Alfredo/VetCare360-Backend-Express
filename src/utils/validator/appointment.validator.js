import { body, param } from "express-validator";

export const createAppointmentValidator = [
  body("date_time")
    .isISO8601()
    .withMessage("Fecha y hora inválidas")
    .bail(),

  body("reason")
    .trim()
    .notEmpty()
    .isString()
    .withMessage("El motivo es obligatorio")
    .bail(),
  body("pet_id")
  .notEmpty()
    .isUUID()
    .withMessage("ID de mascota inválido")
    .bail(),
];
