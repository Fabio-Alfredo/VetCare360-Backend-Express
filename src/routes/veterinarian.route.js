import { Router } from "express";
import * as veterinarian_controller from "../controllers/veterinarian.controller.js";
import * as security from "../middlewares/security.middleware.js";
import * as veterinarian_validator from "../utils/validator/veterinarian.validator.js";
import { validateRequest } from "../middlewares/validator.middleware.js";

const vetRouter = Router();

// Validar que solo personal autorizado pueda registrar veterinarios
vetRouter.post(
  "/register",
  security.authMiddleware,
  veterinarian_validator.veterinarianRegisterValidator,
  validateRequest,
  veterinarian_controller.registerVeterinarian
);

vetRouter.get(
  "/all",
  security.authMiddleware,
  veterinarian_controller.getAllVeterinarians
);

vetRouter.get(
  "/:id",
  security.authMiddleware,
  veterinarian_validator.idParamValidator("id"),
  validateRequest,
  veterinarian_controller.findVeterinarianById
);
export default vetRouter;
