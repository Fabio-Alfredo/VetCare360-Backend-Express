import *as user_repository from "../repositories/user.repository.js"
import *as veterinarian_repository from "../repositories/veterinarian.repository.js"
import { generate_token } from "../utils/security/jwt.security.js";
import ServiceError from "../utils/errors/service.error.js";
import { ValidationError } from "sequelize";

export const registerUser = async (newUser) => {
  try {
    let user = await user_repository.findByemail(newUser.email);

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

//generalizarlo para registra empleados y no solo veterinario
export const registerVeterinarian = async ({ name, lastName, email, password, phone, specialty, tuition_number, available_schedule }) => {
  try {
    let veterinarian = await user_repository.findByemail(email);

    if (veterinarian)
      throw new ServiceError(406, "Email ya registrado en la plataforma");

    const user = await user_repository.save({ name, lastName, email, password, phone })
    veterinarian = await veterinarian_repository.save({ specialty, tuition_number, available_schedule })
    await user.setVeterinarian(veterinarian);

    return veterinarian;
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
