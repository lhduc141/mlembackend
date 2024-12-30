import { responseData } from "../config/response.js";
import * as service from "../services/customerService.js";

export default class CustomerController {
  static async getMenuItem(req, res) {
    const { error, data, status } = await service.getMenuItem();
    if (error) {
      return responseData(res, error, "Get Menu Fail", status);
    }
    return responseData(res, "Login success", data, status);
  }

  static async postNewOrder(req, res) {
    const { userId, orderList } = req.body;

    const { error, data, status } = await service.postNewOrder(
      userId,
      orderList
    );
    if (error) {
      return responseData(res, error, "Order Fail", status);
    }
    return responseData(res, "Order success", data, status);
  }
  static async postNewDish(req, res) {
    const { categoryId, itemDescription, itemPrice, itemImage, itemName,userId  } = req.body;
    const { error, data, status } = await service.postNewDish(
      categoryId, itemDescription, itemPrice, itemImage, itemName,userId
    )

    if (error) {
      return responseData(res, error, "create Menu Fail", status);
    }
    return responseData(res, "add dish success", data, status);
  }
  
}
