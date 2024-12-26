import { responseData } from "../config/response.js";
import * as service from "../services/authServices.js";

export default class AuthController {
  static async login(req, res) {
    const { userEmail, userPassword } = req.body;
    const { error, data, status } = await service.loginService(
      userEmail,
      userPassword
    );

    if (error) {
      return responseData(res, error, "Login Fail", status);
    }
    return responseData(res, "Login success", data, status);
  }

  static async signup(req, res) {
    const { userName, email, password, phone, address } = req.body;

    const result = await service.signUpService(
      userName,
      email,
      password,
      phone,
      address
    );

    if (result.status === 201) {
      return res.status(201).json(result);
    } else {
      return res.status(result.status).json(result);
    }
  }
}
