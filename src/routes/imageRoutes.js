import express from "express";
import {
  getAllImage,
  search,
  getInfoByImageId,
  isSave,
  getSavedImageByUserId,
  getImageByUserId,
  deleteImage,
  uploadImage,
} from "../controllers/imageControllers.js";
import { apiKey } from "../config/jwt.js";

const imgRoutes = express.Router();

imgRoutes.get("", apiKey, getAllImage);
imgRoutes.get("/search", apiKey, search);
imgRoutes.get("/info", apiKey, getInfoByImageId);
imgRoutes.get("/check", apiKey, isSave);
imgRoutes.get("/get-saved-image", apiKey, getSavedImageByUserId);
imgRoutes.get("/get-upload-image", apiKey, getImageByUserId);
imgRoutes.delete("/delete", apiKey, deleteImage);
imgRoutes.post("/upload-image", apiKey, uploadImage);

export default imgRoutes;
