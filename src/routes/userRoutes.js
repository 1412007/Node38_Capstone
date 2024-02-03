import express from "express";
import { apiKey } from "../config/jwt.js";
import { getUser, updateUser } from "../controllers/userControllers.js";

const userRoutes = express.Router();

userRoutes.get("", apiKey, getUser);
userRoutes.put("/update-user", apiKey, updateUser);

export default userRoutes;
