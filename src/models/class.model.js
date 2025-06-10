//modelo de datos
const pool = require("../config/conexion");

//crear las SQL para hacer un CRUD Class

const selectAll = async () => {
  const select = "SELECT * FROM class";
  const [result] = await pool.query(select);
  return result;
};

const createClass = async (data, image) => {
  const { name, hour } = data;
  const insert = "INSERT INTO class (name, hour, image) VALUES (?,?,?)";
  const [result] = await pool.query(insert, [name, hour, image]);

  if (result.affectedRows === 0) {
    return false;
  }
  return result;
};

const selectClassPage = async (page, limit) => {
  const offset = (page - 1) * limit;
  const select = "SELECT * FROM class limit ? offset ?";

  const [data] = await pool.query(select, [limit, offset]);

  return data;
};

const countClass = async () => {
  const [result] = await pool.query("SELECT count (*) as total FROM class");
  const total = result[0].total; // [[{result}]]
  return total;
};

module.exports = { selectAll, createClass, selectClassPage, countClass };
