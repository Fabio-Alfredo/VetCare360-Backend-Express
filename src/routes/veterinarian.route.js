import { Router } from "express";
import * as veterinarian_controller from "../controllers/veterinarian.controller.js";
import * as security from "../middlewares/security.middleware.js";

const vetRouter = Router();

// Validar que solo personal autorizado pueda registrar veterinarios
vetRouter.post(
  "/register",
  security.authMiddleware,
  veterinarian_controller.registerVeterinarian
);

export default vetRouter;
