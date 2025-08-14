import { Router } from "express";
import *as pet_controller from '../controllers/pet.controller.js';
import *as security from '../middlewares/security.middleware.js'

const router = Router();

router.post("/register", security.authMiddleware, pet_controller.registerPet);

export default router;
