import { signUp, logIn } from "../controllers/authControllers.js";
import express from "express";
const authRoutes = express.Router();

authRoutes.post("/sign-up", signUp);
authRoutes.post("/login", logIn);

export default authRoutes;
