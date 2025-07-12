import *as user_repository from "../repositories/user.repository.js"
import { generate_token } from "../utils/security/jwt.security.js";
import ServiceError from "../utils/errors/service.error.js";
import { ValidationError } from "sequelize";

export const registerUser = async (newUser) => {
  try {
    const user = await user_repository.findByemail(newUser.email);

    if (user)
      throw new ServiceError(409, "Email ya registrado");

    return await user_repository.save(newUser);
  } catch (e) {

    if (e instanceof ValidationError) {
      throw new ServiceError(400, e.errors.map(err => err.message).join(', '));
    }

    throw new ServiceError(
      e.code || 500,
      e.message || "Error interno del servidor"
    );
  }
}

export const loginUser = async (email, password) => {
  try {
    const user = await user_repository.findByemail(email);

    if (!user && !(await user.validatePassword(password)))
      throw new ServiceError(401, "Credenciales invalidas");

    const token = generate_token({ id: user.id })

    return token;
  } catch (e) {
    if (e instanceof ValidationError) {
      throw new ServiceError(400, e.errors.map(err => err.message).join(', '));
    }

    throw new ServiceError(
      e.code || 500,
      e.message || "Error interno del servidor"
    );
  }
}
