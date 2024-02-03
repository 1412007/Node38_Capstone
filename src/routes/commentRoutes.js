import express from "express";
import { apiKey } from "../config/jwt.js";
import {
  getCommentByImageId,
  saveComment,
} from "../controllers/commentControllers.js";

const commentRoutes = express.Router();

commentRoutes.get("/info", apiKey, getCommentByImageId);
commentRoutes.post("/upload-comment", apiKey, saveComment);

export default commentRoutes;
