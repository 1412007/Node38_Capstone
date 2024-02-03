import { Sequelize } from "sequelize";

const sequelize = new Sequelize("capstone", "root", "root", {
  host: "localhost",
  port: 3307,
  dialect: "mysql",
});

export default sequelize;
