import bcrypt from "bcrypt";
import initModels from "../models/init-models.js";
import sequelize from "../config/database.js";
import {
  checkRefToken,
  checkToken,
  createRefToken,
  createToken,
  decodeToken,
} from "../config/jwt.js";
import Joi from "joi";

let model = initModels(sequelize);

export const loginService = async (email, password) => {
  try {
    // let check_user = await model.Account.findOne({
    //   where: { email },
    // });

    // if (check_user) {
    //   return { error: "Email exists, use another email", status: 400 };
    // }

    // let hashedPassword = bcrypt.hashSync(password, 10);
    // let newUser = await model.Account.create({
    //   roleID: role_id,
    //   email,
    //   password: hashedPassword,
    // });

    // let roleDetails = null;

    // switch (role_id) {
    //   case 1: // Table
    //     const table = await model.TableEntity.create({
    //       userID: newUser.userID,
    //       tableName: name,
    //       quantity: quantity,
    //       status: 0,
    //     });
    //     roleDetails = {
    //       role: "Table",
    //       tableName: table.tableName,
    //       quantity: table.quantity,
    //     };
    //     break;
    //   case 2: // Admin
    //     const admin = await model.Admin.create({
    //       userID: newUser.userID,
    //       adminName: name,
    //     });
    //     roleDetails = {
    //       role: "Admin",
    //       adminName: admin.adminName,
    //     };
    //     break;
    // }

    return {
      data: {
        userID: 1,
        roleID: 1,
        email: 1,
      },
      status: 200,
    };
  } catch (error) {
    console.error(error);
    return { error: "Error creating user", status: 500 };
  }
};
