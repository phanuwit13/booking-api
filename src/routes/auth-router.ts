import { Router } from "express";
import { AuthController } from "../controllers/auth-controller";

export const AuthRouter = Router();

AuthRouter.post('/auth/register', AuthController.REGISTER)
AuthRouter.post('/auth/login', AuthController.LOGIN)