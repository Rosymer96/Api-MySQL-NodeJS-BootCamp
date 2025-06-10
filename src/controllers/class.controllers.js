//crear funciones para acceder a la coleccion de datos
const classModel = require("../models/class.model");

const getClass = async (req, res) => {
  try {
    const result = await classModel.selectAll();
    res.json(result);
  } catch (error) {
    res.json(error);
  }
};

const newClass = async (req, res) => {
  try {
    const image = req.file.path;
    console.log(req.file.path);
    const result = await classModel.createClass(req.body, image);
    if (!result) {
      res.status(400).json({ message: "No se inserto la clase" });
    }
    res.status(201).json({ classId: result.insertId });
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

const getClassPage = async (req, res) => {
  const page = req.query.page;

  const limit = parseInt(req.query.limit);

  const data = await classModel.selectClassPage(page, limit);

  const total = await classModel.countClass();

  const totalPages = Math.ceil(total / limit);
  res.status(200).json({ result: data, totalPages: totalPages });
};

module.exports = { getClass, newClass, getClassPage };
