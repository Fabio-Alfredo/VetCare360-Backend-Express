import *as auth_controller from "../controllers/auth.controller.js";
import { Router } from "express";

const authRoute = Router();

authRoute.post("/register", auth_controller.registerUserController);
authRoute.post("/login", auth_controller.loginController);

export default authRoute;
