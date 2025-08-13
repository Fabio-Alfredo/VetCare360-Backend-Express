import *as auth_service from "../services/auth.service.js"
import createHttpError from "http-errors";
import responseHandler from "../handlers/res.handler.js";

export const registerUserController = async (req, res, next) => {
  try {
    const user = req.body;
    const newUser = await auth_service.registerUser(user);

    return responseHandler(res, 200, "Usuario registrado con exito", newUser);
  } catch (e) {
    next(createHttpError(e.code, e.message))
  }
}

export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await auth_service.loginUser(email, password);

    return responseHandler(res, 200, "Succces", token);
  } catch (e) {
    next(createHttpError(e.code, e.message));
  }
}
