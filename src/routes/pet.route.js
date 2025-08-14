import { Router } from "express";
import *as pet_controller from '../controllers/pet.controller.js';
import *as security from '../middlewares/security.middleware.js'

const router = Router();

router.post("/register", security.authMiddleware, pet_controller.registerPet);
router.get("/all", security.authMiddleware, pet_controller.findAllPets);
router.get("/by-id/:id", security.authMiddleware, pet_controller.findPetById);
router.get("/by-user/:userId", security.authMiddleware, pet_controller.findAllByUserId);
router.get("/my-pets", security.authMiddleware, pet_controller.findAllMyPets);

export default router;
