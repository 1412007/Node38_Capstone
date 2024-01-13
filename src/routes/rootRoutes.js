import express from "express";
import userRoutes from "./userRoutes.js";
import resRoutes from "./restaurantRoutes.js";

const rootRoutes = express.Router();

rootRoutes.use("/customer", userRoutes);
rootRoutes.use("/restaurant", resRoutes);

export default rootRoutes;
