import *as auth_service from "../services/auth.service.js"
import createHttpError from "http-errors";

export const registerController = async (req, res, next) => {
  try {
    const user = req.body;
    const newUser = await auth_service.registerUser(user);

    res.status(200).send(newUser);
  } catch (e) {
    next(createHttpError(e.code, e.message))
  }
}
