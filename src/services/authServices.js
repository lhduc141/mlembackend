import initModels from "../models/init-models.js";
import sequelize from "../config/database.js";
let model = initModels(sequelize);

export const loginService = async (email, password) => {
  try {
    let user = await model.User.findOne({
      where: { userEmail: email, userPassword: password },
    });

    if (!user) {
      return { error: "Wrong Email or Password", status: 400 };
    }

    const { userEmail, userPassword, ...userWithoutCredentials } =
      user.dataValues;

    return {
      data: userWithoutCredentials,
      status: 200,
    };
  } catch (error) {
    return { error: "Error", status: 500 };
  }
};

export const signUpService = async (
  userName,
  email,
  password,
  phone,
  address
) => {
  try {
    let existingUser = await model.User.findOne({
      where: { userEmail: email },
    });

    if (existingUser) {
      return { error: "Email đã được sử dụng", status: 400 };
    }

    let newUser = await model.User.create({
      userName,
      userEmail: email,
      userPassword: password,
      userPhone: phone,
      userAddress: address,
      roleId: 2,
    });

    return {
      data: {
        userId: newUser.userId,
        userName: newUser.userName,
        userEmail: newUser.userEmail,
      },
      status: 201,
    };
  } catch (error) {
    console.error(error);
    return { error: "Đã xảy ra lỗi khi tạo tài khoản", status: 500 };
  }
};
