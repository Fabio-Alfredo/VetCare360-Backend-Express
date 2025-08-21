import { Router } from "express";
import * as pet_controller from "../controllers/pet.controller.js";
import * as security from "../middlewares/security.middleware.js";
import * as pet_validator from "../utils/validator/pet.validator.js";
import { validateRequest } from "../middlewares/validator.middleware.js";

const router = Router();
// Ruta para registrar una nueva mascota
router.post(
  "/register",
  security.authMiddleware,
  pet_validator.registerPetValidator,
  validateRequest,
  pet_controller.registerPet
);

router.get("/all", security.authMiddleware, pet_controller.findAllPets);
router.get(
  "/by-id/:id",
  security.authMiddleware,
  pet_validator.idParamValidator("id"),
  validateRequest,
  pet_controller.findPetById
);
router.get(
  "/by-user/:userId",
  security.authMiddleware,
  pet_validator.idParamValidator("userId"),
  validateRequest,
  pet_controller.findAllByUserId
);
router.get("/my-pets", security.authMiddleware, pet_controller.findAllMyPets);

router.patch(
  "/update/:id",
  security.authMiddleware,
  pet_validator.idParamValidator("id"),
  pet_validator.updatePetValidator,
  validateRequest,
  pet_controller.updatePet
);
export default router;
