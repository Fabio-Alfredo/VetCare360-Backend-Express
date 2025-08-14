import { Router } from "express";
import authRoute from "./auth.route.js";
import vetRouter from "./veterinarian.route.js";
import petRouter from "./pet.route.js";

const router = Router();

router.use("/auth", authRoute);
router.use("/veterinarians", vetRouter);
router.use("/pets", petRouter);


export default router;
