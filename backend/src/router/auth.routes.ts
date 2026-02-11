import { Router } from "express";
import passport from "../config/passport";
import envConfig from "../config/env.config";
import { AuthController } from "../controller/auth.controller";

const router = Router();
const authController = new AuthController();
const CLIENT_URL = envConfig.CLIENT_URL;

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: CLIENT_URL }),
  (_req, res) => {
    res.redirect(`${CLIENT_URL}/dashboard`);
  }
);

router.get("/me", authController.getMe);
router.post("/logout", authController.logout);

export default router;
