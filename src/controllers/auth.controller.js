import *as auth_service from "../services/auth.service.js"

export const registerController = async (req, res, next) => {
  try {
    const user = req.body;
    const newUser = await auth_service.registerUser(user);

    res.status(200).send(newUser);
  } catch (e) {
    res.status(e.code).json({
      message: e.message || "Error interno del servidor"
    })
  }
}
