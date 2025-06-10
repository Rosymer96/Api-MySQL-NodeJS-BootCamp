const pool = require("../config/conexion");

const selectByEmail = async (email) => {
  const select = "SELECT * FROM user WHERE email = ?";
  const [result] = await pool.query(select, [email]);
  if (result.length === 0) {
    return false;
  }
  return result;
};

const addUser = async (name, email, pass) => {
  const insert = "INSERT INTO user (name, email, password) VALUES (?,?,?)";
  const [result] = await pool.query(insert, [name, email, pass]);
  return result;
};

const selectUserClassById = async (id) => {
  const select =
    "SELECT  user.name AS usuario, class.name AS clase, class.hour AS hora FROM user INNER JOIN user_class ON user_class.fk_user = user.id INNER JOIN class ON class.id = user_class.fk_class WHERE user.id = ? ";
  const [result] = await pool.query(select, [id]);
  return result;
};

module.exports = { addUser, selectByEmail, selectUserClassById };
