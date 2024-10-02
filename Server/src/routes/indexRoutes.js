import { Router } from "express";
const routes = Router();
import authRoutes from "./authRoutes.js";
import hotelRoutes from "./hotelRoutes.js";
import { authenticate } from "../middleware/authenticate.js";

// auth Routes
routes.use("/auth", authRoutes);

// hotel Routes
routes.use("/hotel", authenticate, hotelRoutes);

export default routes;
