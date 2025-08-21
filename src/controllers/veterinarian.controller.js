import * as veterinarian_service from "../services/veterinarian.service.js";
import createHttpError from "http-errors";
import responseHandler from "../handlers/res.handler.js";

export const registerVeterinarian = async (req, res, next) => {
  try {
    const veterinarian = req.body;
    const newVeterinarian = await veterinarian_service.createVeterinarian(
      veterinarian
    );

    return responseHandler(
      res,
      201,
      "Veterinario registrado con éxito",
      newVeterinarian
    );
  } catch (e) {
    next(createHttpError(e.code, e.message));
  }
};

export const getAllVeterinarians = async (req, res, next) => {
  try {
    const veterinarians = await veterinarian_service.findAllVeterinarians();
    return responseHandler(
      res,
      200,
      "Veterinarios obtenidos con éxito",
      veterinarians
    );
  } catch (e) {
    next(createHttpError(e.code, e.message));
  }
};

export const findVeterinarianById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const veterinarian = await veterinarian_service.findVeterinarianById(id);
    return responseHandler(
      res,
      200,
      "Veterinario encontrado con éxito",
      veterinarian
    );
  } catch (e) {
    next(createHttpError(e.code, e.message));
  }
};
