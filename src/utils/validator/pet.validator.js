import { body, param } from "express-validator";

export const registerPetValidator = [
  body("name")
    .trim()
    .isString()
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .bail(),

  body("species")
    .trim()
    .isString()
    .notEmpty()
    .withMessage("La especie es obligatoria")
    .bail(),

  body("rasa")
    .trim()
    .isString()
    .notEmpty()
    .withMessage("La raza es obligatoria")
    .bail(),

  body("sexo")
    .trim()
    .isString()
    .notEmpty()
    .withMessage("El sexo es obligatorio")
    .bail(),

  body("date_of_birth")
    .trim()
    .isString()
    .matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/)
    .withMessage("La fecha de nacimiento debe estar en formato YYYY-MM-DD")
    .bail(),
];

export const idParamValidator = (paramName = "id") => [
  param(paramName)
    .trim()
    .isUUID(4)
    .withMessage("El ID debe ser un UUID válido")
    .bail(),
];
