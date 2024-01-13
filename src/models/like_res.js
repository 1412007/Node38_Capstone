import _sequelize from "sequelize";
const { Model, Sequelize } = _sequelize;

export default class like_res extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        customer_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          references: {
            model: "customer",
            key: "customer_id",
          },
        },
        res_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: "restaurant",
            key: "res_id",
          },
        },
        date_like: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "like_res",
        timestamps: false,
        indexes: [
          {
            name: "customer_id",
            using: "BTREE",
            fields: [{ name: "customer_id" }],
          },
          {
            name: "res_id",
            using: "BTREE",
            fields: [{ name: "res_id" }],
          },
        ],
      }
    );
  }
}
