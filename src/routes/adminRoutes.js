import express from "express";
import AdminController from "../controllers/adminController.js";

const router = express.Router();

router.get("/pending-order", AdminController.getPendingOrder);
router.get("/complete-order", AdminController.getCompleteOrder);

router.post("/complete-order-status", AdminController.postCompleteOrderStatus);

// Thêm món mới
router.post("/menu-items", AdminController.addMenuItem);

// Chỉnh sửa món ăn
router.put("/menu-items/:itemId", AdminController.updateMenuItem);

export default router;
