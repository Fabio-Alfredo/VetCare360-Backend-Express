import { Router } from "express";
import * as veterinarian_controller from '../controllers/veterinarian.controller.js';

const vetRouter = Router();

// Validar que solo personal autorizado pueda registrar veterinarios
vetRouter.post("/register", veterinarian_controller.registerVeterinarian);

export default vetRouter;
