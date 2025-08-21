import { body, param } from "express-validator";
import { ESPECIES_VALUES } from "../constants/species.constant.js";
import { SEX_VALUES } from "../constants/sex.constant.js";

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
    .isIn(ESPECIES_VALUES)
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
    .isIn(SEX_VALUES)
    .withMessage("El sexo es obligatorio")
    .bail(),

  body("date_of_birth")
    .trim()
    .isString()
    .matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/)
    .withMessage("La fecha de nacimiento debe estar en formato YYYY-MM-DD")
    .bail(),
];

export const updatePetValidator=[
    body("name")
    .optional()
    .trim()
    .isString()
    .notEmpty()
    .withMessage("El nuevo nombre es obligatorio")
    .bail(),

  body("species")
    .optional()
    .trim()
    .isString()
    .notEmpty()
    .isIn(ESPECIES_VALUES)
    .withMessage("La especie es obligatoria")
    .bail(),

  body("rasa")
    .optional()
    .trim()
    .isString()
    .notEmpty()
    .withMessage("La raza es obligatoria")
    .bail(),

  body("sexo")
    .optional()
    .trim()
    .isString()
    .notEmpty()
    .isIn(SEX_VALUES)
    .withMessage("El sexo es obligatorio")
    .bail(),

  body("date_of_birth")
    .optional()
    .trim()
    .isString()
    .matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/)
    .withMessage("La fecha de nacimiento debe estar en formato YYYY-MM-DD")
    .bail(),
]

export const idParamValidator = (paramName = "id") => [
  param(paramName)
    .trim()
    .isUUID(4)
    .withMessage("El ID debe ser un UUID válido")
    .bail(),
];
