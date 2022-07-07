// config inicial
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

//ler json / middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//rotas da API
const personRoutes = require("./routes/personRoutes");
app.use("/person", personRoutes);

//rota principal / endpoint
app.get("/", (req, res) => {
  res.json({ message: "Oi express!" });
});

//entregar uma porta
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.yvtnbhp.mongodb.net/bancodaapi=true&w=majority`
  )
  .then(() => {
    console.log("Conectamos ao MongoDB");
    app.listen(3000);
  })
  .catch((error) => console.log(error));
