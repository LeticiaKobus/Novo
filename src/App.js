// Importações e Configuração Inicial
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { createServer } from "http";
import router from "./Router/Routes.js";

const app = express(); // Cria uma instância do servidor Express

app.use(cors()); // Configura o middleware CORS para lidar com políticas de segurança de origem cruzada
app.use(cookieParser()); // Configura o middleware para lidar com cookies
app.use(express.urlencoded({ extended: true })); // Configura o middleware para processar dados de formulários
app.use(express.json()); // Configura o middleware para processar dados em formato JSON
app.use(router); // Aplica o roteador ao servidor
app.use(express.static("public")); // Configura o middleware para servir arquivos estáticos da pasta "public"

// Criação do Servidor e Escuta na Porta 3000
const httpServer = createServer(app); // Cria o servidor HTTP com base na configuração do Express
const port = 3000; // Define a porta

httpServer.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
