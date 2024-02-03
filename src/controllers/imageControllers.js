import sequelize from "../models/connect.js";
import { Op } from "@sequelize/core";
import { jwtDecode } from "jwt-decode";
import initModels from "../models/init-models.js";
import nguoi_dung from "../models/nguoi_dung.js";
import luu_anh from "../models/luu_anh.js";

const conn = initModels(sequelize);

const getAllImage = async (req, res) => {
  try {
    let data = await conn.hinh_anh.findAll();
    res.send(data);
  } catch (error) {
    console.log(`Back end error: ${error}`);
  }
};

const search = async (req, res) => {
  try {
    const keyword = req.query;
    const data = await conn.hinh_anh.findAll({
      where: {
        ten_hinh: {
          [Op.like]: `%${keyword.text}%`,
        },
      },
    });
    res.send(data);
  } catch (error) {
    console.log(`Back end error: ${error}`);
  }
};

const getInfoByImageId = async (req, res) => {
  try {
    const imgId = req.query;
    const data = await conn.hinh_anh.findAll({
      include: {
        model: nguoi_dung,
        as: "nguoi_dung",
        attributes: [
          "nguoi_dung_id",
          "email",
          "ho_ten",
          "tuoi",
          "anh_dai_dien",
        ],
      },
      where: {
        hinh_id: imgId.id,
      },
    });
    res.send(data);
  } catch (error) {
    console.log(`Back end error: ${error}`);
  }
};

const isSave = async (req, res) => {
  try {
    const imgId = req.query;
    const data = await conn.luu_anh.findOne({
      where: {
        hinh_id: imgId.id,
      },
    });
    if (!data) {
      res.status(400).send("Image does not exist in database");
    }
    res.send(data);
  } catch (error) {
    console.log(`Back end ${error}`);
  }
};

const getSavedImageByUserId = async (req, res) => {
  try {
    let { token } = req.headers;

    const data = jwtDecode(token);
    const savedImg = await conn.hinh_anh.findAll({
      include: {
        model: luu_anh,
        as: "luu_anhs",
        where: {
          nguoi_dung_id: data.data.user_id,
        },
      },
    });
    res.send(savedImg);
  } catch (error) {
    console.log(`Back end error: ${error}`);
  }
};

const getImageByUserId = async (req, res) => {
  try {
    let { token } = req.headers;

    const data = jwtDecode(token);
    const img = await conn.hinh_anh.findAll({
      where: {
        nguoi_dung_id: data.data.user_id,
      },
    });
    res.send(img);
  } catch (error) {
    console.log(`Back end error: ${error}`);
  }
};

const deleteImage = async (req, res) => {
  try {
    const imgId = req.query;
    const data = await conn.hinh_anh.findOne({
      where: {
        hinh_id: imgId.id,
      },
    });

    if (!data) {
      res.status(400).send("Invalid id");
    } else {
      await conn.luu_anh.destroy({
        where: {
          hinh_id: imgId.id,
        },
      });
      await conn.binh_luan.destroy({
        where: {
          hinh_id: imgId.id,
        },
      });
      await conn.hinh_anh.destroy({
        where: {
          hinh_id: imgId.id,
        },
      });
    }
    res.status(200).send("Delete successfully");
  } catch (error) {
    console.log(`Back end error: ${error}`);
  }
};

const uploadImage = async (req, res) => {
  try {
    let { token } = req.headers;

    const data = jwtDecode(token);
    let { name, filePath, desc } = req.body;
    const image = {
      ten_hinh: name,
      duong_dan: filePath,
      mo_ta: desc,
      nguoi_dung_id: data.data.user_id,
    };

    const createImage = await conn.hinh_anh.create(image);
    if (!createImage) {
      res
        .status(400)
        .send(
          "There is an error when uploading image. Please try again after few minutes."
        );
    } else {
      const savedImg = {
        nguoi_dung_id: data.data.user_id,
        hinh_id: createImage.hinh_id,
        ngay_luu: new Date(),
      };
      await conn.luu_anh.create(savedImg);
    }
    res.status(200).send("Upload successfully!");
  } catch (error) {}
};

export {
  getAllImage,
  search,
  getInfoByImageId,
  isSave,
  getSavedImageByUserId,
  getImageByUserId,
  deleteImage,
  uploadImage,
};
