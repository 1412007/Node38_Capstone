import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";
import { jwtDecode } from "jwt-decode";

const conn = initModels(sequelize);

const getCommentByImageId = async (req, res) => {
  try {
    const imageId = req.query;
    const data = await conn.binh_luan.findAll({
      where: {
        hinh_id: imageId.id,
      },
    });
    res.send(data);
  } catch (error) {
    console.log(`Back end error: ${error}`);
  }
};

const saveComment = async (req, res) => {
  try {
    let { token } = req.headers;
    let { imgId, content } = req.body;
    const data = jwtDecode(token);

    const comment = {
      nguoi_dung_id: data.data.user_id,
      hinh_id: imgId,
      ngay_binh_luan: new Date(),
      noi_dung: content,
    };
    const createComment = await conn.binh_luan.create(comment);
    if (!createComment) {
      return res
        .status(400)
        .send(
          "There is an error when uploading comment. Please try again after few minutes."
        );
    }
    res.send(comment);
  } catch (error) {
    console.log(`Back end error: ${error}`);
  }
};

export { getCommentByImageId, saveComment };
