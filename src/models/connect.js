import { Sequelize } from "sequelize";

const sequelize = new Sequelize("appFoodDB", "root", "1234", {
  host: "localhost",
  port: 3307,
  dialect: "mysql",
});

// try {
//   await sequelize.authenticate();
//   console.log("connect successfully");
// } catch (error) {
//   console.log("connect error");
// }

export default sequelize;
