import express from "express";
import {
  login,
  signup,
  refreshToken,
  logout,
} from "../controllers/authController";
import validateResource from "../middlewares/validateResource";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refreshToken", refreshToken);

export default router;
