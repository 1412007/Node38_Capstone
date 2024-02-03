import jwt from "jsonwebtoken";

const generateToken = (data) => {
  return jwt.sign({ data }, "NODE38", { expiresIn: "30m" });
};

const checkToken = (token) => {
  return jwt.verify(token, "NODE38", (error, decoded) => {
    if (error) {
      return {
        statusCode: 401,
        message: "Invalid token",
      };
    }
    return {
      statusCode: 200,
      data: decoded,
    };
  });
};

const apiKey = (req, res, next) => {
  let { token } = req.headers;

  if (token) {
    let verifyToken = checkToken(token);
    if (verifyToken.statusCode == 200) {
      next();
    } else {
      res.status(401).send("Unauthorized");
    }
  } else {
    res.status(401).send("Unauthorized");
  }
};

export { generateToken, checkToken, apiKey };
