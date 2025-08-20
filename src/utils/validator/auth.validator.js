import { body, param } from "express-validator";

const forbiddeChars = [' ', '<', '>', '"', "'"];

export const registerValidator =[
    body("name")
    .trim()
    .isString()
    .notEmpty()
    .isLength({ min: 3, max: 20 })
    .withMessage("El nombre debe tener entre 3 y 20 caracteres")
    .bail(),

    body("lastName")
    .trim()
    .isString()
    .notEmpty()
    .isLength({ min: 3, max: 20 })
    .withMessage("El apellido debe tener entre 3 y 20 caracteres")
    .bail(),

    body("email")
    .trim()
    .isEmail()
    .withMessage("El correo electrónico no es válido")
    .bail(),

    body("password")
    .trim()
    .isString()
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .isLength({ min: 6, max: 20 })
    .withMessage("La contraseña debe tener entre 6 y 20 caracteres")
    .custom((value)=>{
        const found = forbiddeChars.find((char)=> value.includes(char))
        if(found){
            throw new Error(`La contraseña contiene el carácter no permitido: ${found}`)
        }
        return true;
    })
    .bail(),

    body("phone")
    .trim()
    .isString()
    .notEmpty()
    .matches(/^\d+$/)
    .withMessage("El teléfono debe tener 8 dígitos")
    .bail()
]

export const loginValidator = [
    body("email")
    .trim()
    .isEmail()
    .withMessage("El correo electrónico no es válido")
    .bail(),

    body("password")
    .trim()
    .isString()
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .bail()
]