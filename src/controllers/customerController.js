import { responseData } from "../config/response.js";
import * as service from "../services/customerService.js";

export default class Customer {
  static async getMenuItem(req, res) {
    const { error, data, status } = await service.getMenuItem();
    if (error) {
      return responseData(res, error, "Get Fail", status);
    }
    return responseData(res, "Login success", data, status);
  }
}
