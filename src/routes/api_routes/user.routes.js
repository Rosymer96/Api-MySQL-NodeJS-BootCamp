const router = require("express").Router();
const user = require("../../controllers/user.controllers");
const checkToken = require("../../middleware/auth");

router.post("/register", user.registerUser);
router.post("/login", user.login);
//ruta privada
router.get("/profile", checkToken, user.getProfile);

module.exports = router;
