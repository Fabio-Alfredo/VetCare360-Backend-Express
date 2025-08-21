import { body, param } from "express-validator";

const reguexSchedule =
  /^(Lunes|Martes|Miércoles|Jueves|Viernes|Sábado|Domingo)\s([0-1]?[0-9]|2[0-3]):[0-5][0-9]-([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

export const veterinarianRegisterValidator = [
  body("specialty")
    .optional()
    .trim()
    .isString()
    .notEmpty()
    .withMessage("La especialidad es obligatoria")
    .bail(),

  body("tuition_number")
    .trim()
    .isString()
    .notEmpty()
    .isLength({ min: 6, max: 20 })
    .withMessage("El número de matrícula debe tener entre 6 y 20 caracteres")
    .bail(),

  body("available_schedule")
    .isArray()
    .withMessage("El horario disponible debe ser un arreglo")
    .bail()
    .custom((value) => {
      for (const schedule of value) {
        if (!reguexSchedule.test(schedule)) {
          throw new Error(`El horario ${schedule} no es válido`);
        }
      }
      return true;
    })
    .bail(),
  body("userId")
    .trim()
    .isUUID(4)
    .notEmpty()
    .withMessage("El ID de usuario es obligatorio y debe ser un UUID válido")
    .bail(),
];

export const idParamValidator = (paramName = "id") => [
  param(paramName)
    .trim()
    .isUUID(4)
    .withMessage(`El parámetro ${paramName} debe ser un UUID válido`)
    .bail(),
];
