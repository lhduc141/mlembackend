import express from "express";
import CustomerController from "../controllers/customerController.js";

const router = express.Router();

router.get("/menu", CustomerController.getMenuItem);
router.post("/order", CustomerController.postNewOrder);
router.post("/newDish", CustomerController.postNewDish);
// change password

export default router;
