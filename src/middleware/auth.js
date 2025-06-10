const jwt = require("jsonwebtoken");
const { verifyToken } = require("../utils/jwt");
const checkToken = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      res.json({ success: false, message: "El token es obligatorio" });
    }
    const token = req.headers.authorization.split(" ")[1];

    const resultToken = verifyToken(token);

    if (!resultToken) {
      res.json({ sucess: false, message: "Token invalido" });
    } else {
      req.userLogin = resultToken;
      next();
    }
  } catch (error) {}
  //validar el token
};
module.exports = checkToken;
