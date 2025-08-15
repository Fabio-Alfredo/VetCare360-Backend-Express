import * as auth_controller from "../controllers/auth.controller.js";
import * as auth_validators from "../utils/validator/auth.validator.js";
import { validateRequest } from "../middlewares/validator.middleware.js";
import { Router } from "express";

const authRoute = Router();

authRoute.post(
  "/register",
  auth_validators.registerValidator,
  validateRequest,
  auth_controller.registerUserController
);
authRoute.post(
  "/login",
  auth_validators.loginValidator,
  validateRequest,
  auth_controller.loginController
);

export default authRoute;
