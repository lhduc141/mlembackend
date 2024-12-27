import { responseData } from "../config/response.js";
import * as service from "../services/adminService.js";

export default class AdminController {
  static async getPendingOrder(req, res) {
    const { error, data, status } = await service.getPendingOrder();
    if (error) {
      return responseData(res, error, "", status);
    }
    return responseData(res, "Get current order successfully", data, status);
  }

  static async getCompleteOrder(req, res) {
    const { error, data, status } = await service.getCompleteOrder();
    if (error) {
      return responseData(res, error, "", status);
    }
    return responseData(res, "Get current order successfully", data, status);
  }

  static async postCompleteOrderStatus(req, res) {
    const { orderId } = req.body;
    const { error, data, status } = await service.postCompleteOrderStatus(
      orderId
    );
    if (error) {
      return responseData(res, error, "", status);
    }
    return responseData(res, "Get current order successfully", data, status);
  }

  static async addMenuItem(req, res) {
    const { itemName, itemPrice, categoryName } = req.body;

    if (!itemName || !itemPrice || !categoryName) {
      return responseData(
        res,
        null,
        "Invalid input: Missing required fields",
        400
      );
    }

    const { success, message, data, status } = await service.addMenuItem(
      itemName,
      itemPrice,
      categoryName
    );

    return responseData(res, message, data, status);
  }

  // Chỉnh sửa món ăn
  static async updateMenuItem(req, res) {
    const { itemId } = req.params;
    const { itemName, itemPrice } = req.body;

    if (!itemId || !itemName || !itemPrice) {
      return responseData(
        res,
        null,
        "Invalid input: Missing required fields",
        400
      );
    }

    const { success, message, data, status } = await service.updateMenuItem(
      itemId,
      itemName,
      itemPrice
    );

    return responseData(res, message, data, status);
  }
}
