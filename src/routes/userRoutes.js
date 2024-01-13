import express from "express";
import { getUser, postOrder } from "../controllers/userControllers.js";

const userRoutes = express.Router();

userRoutes.get("/get-customers", getUser);
userRoutes.post("/order", postOrder);

export default userRoutes;
