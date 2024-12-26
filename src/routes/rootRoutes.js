import express from "express";
import authRoutes from "./authRoutes.js";
import adminRoutes from "./adminRoutes.js";
import customerRoutes from "./customerRoutes.js";

const router = express.Router();

// Set up route modules
router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);
router.use("/customer", customerRoutes);

export default router;
