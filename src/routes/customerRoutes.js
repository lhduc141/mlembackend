import express from "express";
import CustomerController from "../controllers/customerController.js";

const router = express.Router();

router.get("/menu", CustomerController.getMenuItem);
// change password

export default router;
