import initModels from "../models/init-models.js";
import sequelize from "../config/database.js";
let model = initModels(sequelize);

export const getMenuItem = async () => {
  try {
    const menuItems = await model.MenuItem.findAll();
    const categories = await model.Category.findAll();
    const categoryMap = categories.reduce((acc, category) => {
      acc[category.categoryId] = category.categoryName;
      return acc;
    }, {});

    const formattedData = Object.values(
      menuItems.reduce((acc, item) => {
        const categoryId = item.categoryId;
        const categoryName = categoryMap[categoryId] || "Unknown";

        if (!acc[categoryId]) {
          acc[categoryId] = {
            category: {
              categoryId,
              categoryName,
            },
            items: [],
          };
        }

        acc[categoryId].items.push({
          itemId: item.itemId,
          itemName: item.itemName,
          itemPrice: item.itemPrice,
          itemDescription: item.itemDescription,
          itemImage: item.itemImage,
        });

        return acc;
      }, {})
    );

    return {
      success: true,
      data: formattedData,
      status: 200,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || "Lỗi khi tìm menu item",
      status: 500,
    };
  }
};

export const postNewOrder = async (userId, orderList) => {
  try {
    const user = await model.User.findOne({ where: { userId } });
    if (!user) {
      throw new Error("User not found");
    }

    if (user.roleId === 1) {
      throw new Error("Admins are not allowed to create orders");
    }

    const newOrder = await model.Order.create({
      userId,
      orderDate: new Date(),
      orderStatus: "Pending",
    });
    const orderItems = orderList.map((item) => ({
      orderId: newOrder.orderId,
      itemId: item.itemId,
      quantity: item.quantity,
    }));
    await model.OrderItem.bulkCreate(orderItems);

    return {
      success: true,
      message: "Order created successfully",
      data: { orderId: newOrder.orderId },
      status: 201,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Order creation failed",
      data: null,
      status: 500,
    };
  }
};
