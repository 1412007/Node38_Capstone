import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _customer from  "./customer.js";
import _food from  "./food.js";
import _food_type from  "./food_type.js";
import _like_res from  "./like_res.js";
import _order_food from  "./order_food.js";
import _rate_res from  "./rate_res.js";
import _restaurant from  "./restaurant.js";
import _sub_food from  "./sub_food.js";

export default function initModels(sequelize) {
  const customer = _customer.init(sequelize, DataTypes);
  const food = _food.init(sequelize, DataTypes);
  const food_type = _food_type.init(sequelize, DataTypes);
  const like_res = _like_res.init(sequelize, DataTypes);
  const order_food = _order_food.init(sequelize, DataTypes);
  const rate_res = _rate_res.init(sequelize, DataTypes);
  const restaurant = _restaurant.init(sequelize, DataTypes);
  const sub_food = _sub_food.init(sequelize, DataTypes);

  like_res.belongsTo(customer, { as: "customer", foreignKey: "customer_id"});
  customer.hasMany(like_res, { as: "like_res", foreignKey: "customer_id"});
  order_food.belongsTo(customer, { as: "customer", foreignKey: "customer_id"});
  customer.hasMany(order_food, { as: "order_foods", foreignKey: "customer_id"});
  rate_res.belongsTo(customer, { as: "customer", foreignKey: "customer_id"});
  customer.hasMany(rate_res, { as: "rate_res", foreignKey: "customer_id"});
  order_food.belongsTo(food, { as: "food", foreignKey: "food_id"});
  food.hasMany(order_food, { as: "order_foods", foreignKey: "food_id"});
  sub_food.belongsTo(food, { as: "food", foreignKey: "food_id"});
  food.hasMany(sub_food, { as: "sub_foods", foreignKey: "food_id"});
  food.belongsTo(food_type, { as: "foodtype", foreignKey: "foodtype_id"});
  food_type.hasMany(food, { as: "foods", foreignKey: "foodtype_id"});
  like_res.belongsTo(restaurant, { as: "re", foreignKey: "res_id"});
  restaurant.hasMany(like_res, { as: "like_res", foreignKey: "res_id"});
  rate_res.belongsTo(restaurant, { as: "re", foreignKey: "res_id"});
  restaurant.hasMany(rate_res, { as: "rate_res", foreignKey: "res_id"});

  return {
    customer,
    food,
    food_type,
    like_res,
    order_food,
    rate_res,
    restaurant,
    sub_food,
  };
}
