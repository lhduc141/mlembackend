import express from "express";
import AuthController from "../controllers/authController.js";

const router = express.Router();

router.post("/login", AuthController.login);
router.post("/signup", AuthController.signup);
// change password

export default router;
