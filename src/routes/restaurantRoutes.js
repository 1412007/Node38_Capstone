import express from "express";
import {
  getRestaurant,
  getLikeRestaurant,
  postLikeRestaurant,
  delLikeRestaurant,
  getRateRestaurant,
  postRateRestaurant,
} from "../controllers/restaurantControllers.js";

const resRoutes = express.Router();

resRoutes.get("/get-restaurant", getRestaurant);
resRoutes.get("/get-like-restaurant/:customerId/:resId", getLikeRestaurant);
resRoutes.post("/like-restaurant", postLikeRestaurant);
resRoutes.delete("/unlike-restaurant/:customerId/:resId", delLikeRestaurant);

resRoutes.get("/get-rate-restaurant/:customerId/:resId", getRateRestaurant);
resRoutes.post("/rate-restaurant", postRateRestaurant);

export default resRoutes;
