import initModels from "../models/init-models.js";
import sequelize from "../config/database.js";
let model = initModels(sequelize);

export const getMenuItem = async () => {
  try {
    let data = await model.MenuItem.findAll();
    return {
      data,
      status: 200,
    };
  } catch (error) {
    return { error: "Lỗi khi tìm người dùng", status: 500 };
  }
};
