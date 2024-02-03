import { generateToken } from "../config/jwt.js";
import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";
import bcrypt from "bcrypt";

const conn = initModels(sequelize);

const signUp = async (req, res) => {
  try {
    const email = req.body.email.toLowerCase();
    const existingEmail = await conn.nguoi_dung.findOne({
      where: { email: `${email}` },
    });
    if (existingEmail) {
      res.status(409).send("Email already existed");
    } else {
      const hashPassword = bcrypt.hashSync(req.body.password, 15);
      const user = {
        email: email,
        mat_khau: hashPassword,
        ho_ten: req.body.name,
        tuoi: req.body.age,
      };
      const createUser = await conn.nguoi_dung.create(user);
      if (!createUser) {
        return res
          .status(400)
          .send(
            "There is an error when creating account. Please try again after few minutes."
          );
      }
      res.send(email);
    }
  } catch (error) {
    console.log(`Back end error: ${error}`);
  }
};

const logIn = async (req, res) => {
  try {
    const email = req.body.email.toLowerCase();
    const password = req.body.password;
    const user = await conn.nguoi_dung.findOne({
      where: { email: `${email}` },
    });

    if (!user) {
      res.status(401).send("Email is incorrect");
    }
    const isValidPassword = bcrypt.compareSync(password, user.mat_khau);
    if (!isValidPassword) {
      res.status(401).send("Password is incorrect");
    }

    let payload = {
      user_id: user.nguoi_dung_id,
    };
    let token = generateToken(payload);
    res.status(200).send(token);
  } catch (error) {
    console.log(`Back end error: ${error}`);
  }
};

export { signUp, logIn };
