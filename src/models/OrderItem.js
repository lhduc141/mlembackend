import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class OrderItem extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    orderItemId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Order',
        key: 'orderId'
      }
    },
    itemId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'MenuItem',
        key: 'itemId'
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'OrderItem',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "orderItemId" },
        ]
      },
      {
        name: "orderId",
        using: "BTREE",
        fields: [
          { name: "orderId" },
        ]
      },
      {
        name: "itemId",
        using: "BTREE",
        fields: [
          { name: "itemId" },
        ]
      },
    ]
  });
  }
}
