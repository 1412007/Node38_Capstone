import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";
import { jwtDecode } from "jwt-decode";

const conn = initModels(sequelize);

const getUser = async (req, res) => {
  try {
    let { token } = req.headers;

    const data = jwtDecode(token);
    const user = await conn.nguoi_dung.findOne({
      attributes: ["nguoi_dung_id", "email", "ho_ten", "tuoi", "anh_dai_dien"],
      where: {
        nguoi_dung_id: data.data.user_id,
      },
    });
    res.send(user);
  } catch (error) {
    console.log(`Back end error: ${error}`);
  }
};

const updateUser = async (req, res) => {
  try {
    let { token } = req.headers;

    const data = jwtDecode(token);
    let { name, age, avatar } = req.body;
    const user = await conn.nguoi_dung.findOne({
      where: {
        nguoi_dung_id: data.data.user_id,
      },
    });

    if (!user) {
      res.status(400).send("Invalid id");
    } else {
      user.update({ ho_ten: name, tuoi: age, anh_dai_dien: avatar });
      user.save();
    }
    res.status(200).send("Update succecssfully");
  } catch (error) {
    console.log(`Back end error: ${error}`);
  }
};

export { getUser, updateUser };
