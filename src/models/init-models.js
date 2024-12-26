import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _Category from  "./Category.js";
import _MenuItem from  "./MenuItem.js";
import _Order from  "./Order.js";
import _OrderItem from  "./OrderItem.js";
import _Role from  "./Role.js";
import _User from  "./User.js";

export default function initModels(sequelize) {
  const Category = _Category.init(sequelize, DataTypes);
  const MenuItem = _MenuItem.init(sequelize, DataTypes);
  const Order = _Order.init(sequelize, DataTypes);
  const OrderItem = _OrderItem.init(sequelize, DataTypes);
  const Role = _Role.init(sequelize, DataTypes);
  const User = _User.init(sequelize, DataTypes);

  MenuItem.belongsTo(Category, { as: "category", foreignKey: "categoryId"});
  Category.hasMany(MenuItem, { as: "MenuItems", foreignKey: "categoryId"});
  OrderItem.belongsTo(MenuItem, { as: "item", foreignKey: "itemId"});
  MenuItem.hasMany(OrderItem, { as: "OrderItems", foreignKey: "itemId"});
  OrderItem.belongsTo(Order, { as: "order", foreignKey: "orderId"});
  Order.hasMany(OrderItem, { as: "OrderItems", foreignKey: "orderId"});
  User.belongsTo(Role, { as: "role", foreignKey: "roleId"});
  Role.hasMany(User, { as: "Users", foreignKey: "roleId"});
  Order.belongsTo(User, { as: "user", foreignKey: "userId"});
  User.hasMany(Order, { as: "Orders", foreignKey: "userId"});

  return {
    Category,
    MenuItem,
    Order,
    OrderItem,
    Role,
    User,
  };
}
