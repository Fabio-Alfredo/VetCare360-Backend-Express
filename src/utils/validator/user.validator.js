import { body, param } from "express-validator";

export const validateUpdateUser = [
  body("name")
    .optional()
    .trim()
    .isString()
    .notEmpty()
    .isLength({ min: 3, max: 20 })
    .withMessage("El nombre debe tener entre 3 y 20 caracteres")
    .bail(),

  body("lastName")
    .optional()
    .trim()
    .isString()
    .notEmpty()
    .isLength({ min: 3, max: 20 })
    .withMessage("El apellido debe tener entre 3 y 20 caracteres")
    .bail(),

  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("El correo electrónico no es válido")
    .bail(),

  body("phone")
    .optional()
    .trim()
    .isString()
    .notEmpty()
    .isLength({ min: 8, max: 8 })
    .matches(/^\d+$/)
    .withMessage(
      "El número de teléfono debe tener 8 caracteres y contener solo dígitos"
    )
    .bail(),
];

export const idParamValidator = (idParam = "id") => [
  param(idParam)
    .trim()
    .isUUID(4)
    .withMessage("El ID debe ser un ID de Mongo válido")
    .bail(),
];
