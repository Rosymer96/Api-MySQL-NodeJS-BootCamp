const { JsonWebTokenError } = require("jsonwebtoken");
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createToken } = require("../utils/jwt");

const registerUser = async (req, res) => {
  try {
    let { name, email, pass } = req.body;

    const selectedUser = await userModel.selectByEmail(email);
    if (selectedUser) {
      res.status(400).json({ message: "El email ya existe" });
    }

    pass = bcrypt.hashSync(pass, 10);

    const result = await userModel.addUser(name, email, pass);
    console.log(result);

    res
      .status(201)
      .json({ mensaje: "Registrado con exito", resultId: result.insertId });
    //1. ontener datos
    //2. select del usuario por email
    //1. si esta devolvemos un mensaje error
    //sino esta
    //1. encriptar contrase;a
    //2. A;adir a la BD
  } catch (error) {
    res.status(500).json(error);
  }
};

const login = async (req, res) => {
  try {
    const userBody = req.body;
    const selectedUser = await userModel.selectByEmail(userBody.email);
    if (!selectedUser) {
      res.status(404).json({ message: "Email no existe" });
    }
    const isSame = bcrypt.compareSync(userBody.pass, selectedUser[0].password);
    if (!isSame) {
      res.status(400).json({ message: "Contraseña incorrecta" });
    }
    const data = {
      id: selectedUser[0].id,
      email: selectedUser[0].email,
    };
    const token = createToken(data);
    res.status(200).json({ message: "success", token });

    // //obtener email y password
    // validad que emailexise en la BD
    //validar la contrase;a que esta encriptada
    //crear un token con los datos del usuario
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const getProfile = async (req, res) => {
  try {
    console.log(req.userLogin);
    const dataUser = await userModel.selectUserClassById(req.userLogin.id);
    res.status(200).json(dataUser);
    console.log("He llegado al profile");
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

module.exports = { registerUser, login, getProfile };
