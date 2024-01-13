import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";

const conn = initModels(sequelize);

const getUser = async (req, res) => {
  try {
    let data = await conn.customer.findAll();
    res.send(data);
  } catch (error) {
    console.log(`Back end error: ${error}`);
  }
};

const postOrder = async (req, res) => {
  try {
    let body = req.body;
    let data = await conn.order_food.create({
      customer_id: body.customerId,
      food_id: body.foodId,
      amount: body.amount,
      code: body.code,
      arr_sub_id: body.subId,
    });
    res.send(data);
  } catch (error) {
    console.log(`Back end error: ${error}`);
  }
};

export { getUser, postOrder };
