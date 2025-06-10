//imports
const express = require("express"); // npm install express
const cors = require("cors");
const cloudinary = require("cloudinary").v2;

require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

//import de los modulos personalizados
const router = require("./routes/api.routes");

// crear un servidor y configuracion
const server = express();
server.use(express.json());
server.use(cors()); //poder hacer solicitudes a nuestro servidor a que le hagan peticiones

server.use("/api", router);

// puerto a traves de cual escucho
const PORT = 3500;
server.listen(PORT, () => {
  console.log(`Server running http://localhost:${PORT}`);
});
