import { Router } from "express";
import { authController } from "../../controllers/index.js";

const v1authRouter = Router();

v1authRouter.post(
  "/signup",
  authController.signup,
);

v1authRouter.post(
  "/login",
  authController.login,
);

export { v1authRouter };
