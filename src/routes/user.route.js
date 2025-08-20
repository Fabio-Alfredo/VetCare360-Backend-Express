import { Router } from "express";
import *as user_controller from "../controllers/user.controller.js";
import * as security from "../middlewares/security.middleware.js";
import * as user_validator from "../utils/validator/user.validator.js";
import { validateRequest } from "../middlewares/validator.middleware.js";

const userRoute = Router();

userRoute.patch(
    "/:id",
    security.authMiddleware,
    user_validator.idParamValidator(),
    user_validator.validateUpdateUser,
    validateRequest,
    user_controller.updateDataUser
);

export default userRoute;
