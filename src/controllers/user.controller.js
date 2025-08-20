import * as user_service from "../services/user.service.js";
import createHttpError from "http-errors";
import responseHandler from "../handlers/res.handler.js";

export const updateDataUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userData = req.body;
    const user = req.user;
    
    if (user.id != id)
      return next(
        createHttpError(403, "No tienes permiso para actualizar este usuario")
      );

    await user_service.updateUser(user.id, userData);

    return responseHandler(res, 200, "Usuario actualizado correctamente");
  } catch (e) {
    next(createHttpError(e.code, e.message));
  }
};
