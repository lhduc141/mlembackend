import initModels from "../models/init-models.js";
import sequelize from "../config/database.js";
let model = initModels(sequelize);

export const getPendingOrder = async () => {
  try {
    const completedOrders = await model.Order.findAll({
      where: { orderStatus: "Pending" },
      include: [
        {
          model: model.OrderItem,
          as: "OrderItems",
          include: [
            {
              model: model.MenuItem,
              as: "item",
              attributes: ["itemName", "itemPrice"], // Lấy tên và giá của món ăn
            },
          ],
        },
        {
          model: model.User,
          as: "user", // Bao gồm thông tin người dùng
          attributes: ["userId", "userName", "userEmail", "userPhone"], // Lấy thông tin người đặt hàng
        },
      ],
    });

    const result = completedOrders.map((order) => {
      const orderDetails = order.OrderItems.map((orderItem) => ({
        orderItemId: orderItem.orderItemId,
        itemName: orderItem.item.itemName,
        quantity: orderItem.quantity,
        itemTotal: orderItem.quantity * orderItem.item.itemPrice, // Tính tổng tiền từng món
      }));

      const orderTotal = orderDetails.reduce(
        (sum, item) => sum + item.itemTotal,
        0
      ); // Tổng tiền của tất cả các món trong order

      return {
        orderId: order.orderId,
        user: {
          userId: order.user.userId,
          userName: order.user.userName,
          userEmail: order.user.userEmail,
          userPhone: order.user.userPhone,
        },
        orderDetails,
        orderTotal,
      };
    });

    return {
      data: result,
      status: 200,
    };
  } catch (error) {
    return {
      data: null,
      status: 500,
    };
  }
};

export const getCompleteOrder = async () => {
  try {
    const completedOrders = await model.Order.findAll({
      where: { orderStatus: "Completed" },
      include: [
        {
          model: model.OrderItem,
          as: "OrderItems",
          include: [
            {
              model: model.MenuItem,
              as: "item",
              attributes: ["itemName", "itemPrice"], // Lấy tên và giá của món ăn
            },
          ],
        },
        {
          model: model.User,
          as: "user", // Bao gồm thông tin người dùng
          attributes: ["userId", "userName", "userEmail", "userPhone"], // Lấy thông tin người đặt hàng
        },
      ],
    });

    const result = completedOrders.map((order) => {
      const orderDetails = order.OrderItems.map((orderItem) => ({
        orderItemId: orderItem.orderItemId,
        itemName: orderItem.item.itemName,
        quantity: orderItem.quantity,
        itemTotal: orderItem.quantity * orderItem.item.itemPrice, // Tính tổng tiền từng món
      }));

      const orderTotal = orderDetails.reduce(
        (sum, item) => sum + item.itemTotal,
        0
      ); // Tổng tiền của tất cả các món trong order

      return {
        orderId: order.orderId,
        user: {
          userId: order.user.userId,
          userName: order.user.userName,
          userEmail: order.user.userEmail,
          userPhone: order.user.userPhone,
        },
        orderDetails,
        orderTotal,
      };
    });

    return {
      data: result,
      status: 200,
    };
  } catch (error) {
    return {
      data: null,
      status: 500,
    };
  }
};

export const postCompleteOrderStatus = async (orderId) => {
  try {
    const order = await model.Order.findOne({ where: { orderId } });

    if (!order) {
      return {
        success: false,
        message: "Order not found",
        status: 404,
      };
    }

    const newStatus = "Completed";
    await order.update({ orderStatus: newStatus });

    return {
      success: true,
      message: "Order status updated to Completed",
      data: { orderId: order.orderId, newStatus: order.orderStatus },
      status: 200,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Failed to update order status",
      data: null,
      status: 500,
    };
  }
};

export const updateMenuItem = async (itemId, itemName, itemPrice) => {
  try {
    const menuItem = await model.MenuItem.findOne({ where: { itemId } });

    if (!menuItem) {
      return {
        success: false,
        message: "Menu item not found",
        status: 404,
      };
    }

    await menuItem.update({
      itemName,
      itemPrice,
    });

    return {
      success: true,
      message: "Menu item updated successfully",
      data: menuItem,
      status: 200,
    };
  } catch (error) {
    console.error("Error updating menu item:", error);
    return {
      success: false,
      message: error.message || "Failed to update menu item",
      data: null,
      status: 500,
    };
  }
};

export const addMenuItem = async (itemName, itemPrice, categoryName) => {
  try {
    const category = await model.Category.findOne({
      where: { categoryName },
    });

    if (!category) {
      return {
        success: false,
        message: "Category not found",
        status: 404,
      };
    }

    const newItem = await model.MenuItem.create({
      itemName,
      itemPrice,
      categoryId: category.categoryId,
    });

    return {
      success: true,
      message: "Menu item added successfully",
      data: newItem,
      status: 201,
    };
  } catch (error) {
    console.error("Error adding menu item:", error);
    return {
      success: false,
      message: error.message || "Failed to add menu item",
      data: null,
      status: 500,
    };
  }
};
