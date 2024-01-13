import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class food extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    food_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    food_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    img: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    foot_desc: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    foodtype_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'food_type',
        key: 'foodtype_id'
      }
    }
  }, {
    sequelize,
    tableName: 'food',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "food_id" },
        ]
      },
      {
        name: "foodtype_id",
        using: "BTREE",
        fields: [
          { name: "foodtype_id" },
        ]
      },
    ]
  });
  }
}
