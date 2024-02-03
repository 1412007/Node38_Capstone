import express from "express";
import authRoutes from "./authRoutes.js";
import imageRoutes from "./imageRoutes.js";
import commentRoutes from "./commentRoutes.js";
import userRoutes from "./userRoutes.js";

const rootRoutes = express.Router();

rootRoutes.use("/authentication", authRoutes);
rootRoutes.use("/image", imageRoutes);
rootRoutes.use("/comment", commentRoutes);
rootRoutes.use("/user", userRoutes);

export default rootRoutes;
