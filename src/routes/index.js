import { Router } from "express";
import authRoute from "./auth.route.js";
import vetRouter from "./veterinarian.route.js";
import petRouter from "./pet.route.js";
import userRoute from "./user.route.js";
import appointmentRoute from "./appointment.route.js";

const router = Router();

router.use("/auth", authRoute);
router.use("/veterinarians", vetRouter);
router.use("/users", userRoute);
router.use("/pets", petRouter);
router.use("/appointments", appointmentRoute);

export default router;
