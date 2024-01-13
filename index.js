import express from "express";
import rootRoutes from "./src/routes/rootRoutes.js";

// B5: tạo biến app để start BE
const app = express();
// add middleware để express hiểu body nhận về là object (json)
app.use(express.json());
app.use(rootRoutes);

// B6: setup port cho BE -> 8080
app.listen("8080", () => {
  console.log("BE is starting");
});
