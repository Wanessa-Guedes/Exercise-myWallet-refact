import { Router } from "express";

import { signInController, signUpController } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/sign-up", signUpController);

authRouter.post("/sign-in", signInController);

export default authRouter;