import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class MenuItem extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    itemId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Category',
        key: 'categoryId'
      }
    },
    itemName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    itemPrice: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    itemDescription: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    itemImage: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'MenuItem',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "itemId" },
        ]
      },
      {
        name: "categoryId",
        using: "BTREE",
        fields: [
          { name: "categoryId" },
        ]
      },
    ]
  });
  }
}
