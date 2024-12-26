import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class User extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    userId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Role',
        key: 'roleId'
      }
    },
    userName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    userEmail: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: "userEmail"
    },
    userPassword: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    userPhone: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    userAddress: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'User',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      },
      {
        name: "userEmail",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "userEmail" },
        ]
      },
      {
        name: "roleId",
        using: "BTREE",
        fields: [
          { name: "roleId" },
        ]
      },
    ]
  });
  }
}
