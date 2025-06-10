const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "gym",
    allowedFormats: ["jpg", "png", "webp", "gif", "jpeg"],
  },
});

const upload = multer({ storage });

module.exports = upload;
