import { Router } from "express";
import { login, register } from "../controllers/authController.js";
import { authenticate } from "../middleware/authenticate.js";
const routes = Router();

routes.post("/register", register);

routes.post("/login", login);


export default routes;
