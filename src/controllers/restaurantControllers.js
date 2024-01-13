import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";

const conn = initModels(sequelize);

const getRestaurant = async (req, res) => {
  try {
    let data = await conn.restaurant.findAll();
    res.send(data);
  } catch (error) {
    console.log(`Back end error: ${error}`);
  }
};

const getLikeRestaurant = async (req, res) => {
  try {
    let data = await conn.like_res.findAll({
      attributes: ["customer_id", "res_id", "date_like"],
      where: {
        customer_id: req.params["customerId"],
        res_id: req.params["resId"],
      },
    });
    res.send(data);
  } catch (error) {
    console.log(`Back end error: ${error}`);
  }
};

const postLikeRestaurant = async (req, res) => {
  try {
    let body = req.body;
    let data = await conn.like_res.create({
      customer_id: body.customerId,
      res_id: body.resId,
      date_like: body.date,
    });
    res.send(data);
  } catch (error) {
    console.log(`Back end error: ${error}`);
  }
};

const delLikeRestaurant = async (req, res) => {
  try {
    await conn.like_res.destroy({
      where: {
        customer_id: req.params["customerId"],
        res_id: req.params["resId"],
      },
    });
    res.sendStatus(200).end();
  } catch (error) {
    console.log(`Back end error: ${error}`);
  }
};

const getRateRestaurant = async (req, res) => {
  try {
    let data = await conn.rate_res.findAll({
      attributes: ["customer_id", "res_id", "amount", "date_rate"],
      where: {
        customer_id: req.params["customerId"],
        res_id: req.params["resId"],
      },
    });
    res.send(data);
  } catch (error) {
    console.log(`Back end error: ${error}`);
  }
};

const postRateRestaurant = async (req, res) => {
  try {
    let body = req.body;
    let data = await conn.rate_res.create({
      customer_id: body.customerId,
      res_id: body.resId,
      amount: body.amount,
      date_rate: body.date,
    });
    res.send(data);
  } catch (error) {
    console.log(`Back end error: ${error}`);
  }
};

export {
  getRestaurant,
  getLikeRestaurant,
  postLikeRestaurant,
  delLikeRestaurant,
  getRateRestaurant,
  postRateRestaurant,
};
