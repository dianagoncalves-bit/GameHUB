// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const conexao = require("./db.js");

import "dotenv/config";
import express from "express";
import cors from "cors";
import conexao from "./db.js";
import {textoValido, inteiroPositivo} from "./src/utils/validacoes.js"
import validarId from "./src/middleware/validarid.js"
import tratarErro from "./src/middleware/tratarErro.js"

import estudioRoute from "./src/routes/estudiosRoute.js"
import jogosRoute from "./src/routes/jogosRoutes.js"
import jogadoresRoute from "./src/routes/jogadoresRoute.js"

const app = express();
const PORTA = Number(process.env.PORTA || 3000);
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({ mensagem: "API do GameHub funcionando" });
});

// #region estudios
app.use("/estudios", estudioRoute) 

// #endregion estudios
// #region jogos

app.get("/jogos", jogosRoute)

// #endregion jogos
// #region jogadores

app.get("/jogadores", jogadoresRoute) 