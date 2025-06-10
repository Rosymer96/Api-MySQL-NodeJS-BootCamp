const router = require("express").Router();

const classCon = require("../../controllers/class.controllers");

const upload = require("../../middleware/upload");
router.get("/class", classCon.getClass);

router.post("/create", upload.single("image"), classCon.newClass);

router.get("/list", classCon.getClassPage);

module.exports = router;
