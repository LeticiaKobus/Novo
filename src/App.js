// Importações e Configuração Inicial
import cors from "cors";
import express, { Router } from "express";
import { createServer } from "http";

const app = express(); // Cria uma instância do servidor Express
const router = Router(); // Cria um roteador para definir rotas
app.use(router); // Aplica o roteador ao servidor

app.use(cors()); // Configura o middleware CORS para lidar com políticas de segurança de origem cruzada
app.use(express.static("public")); // Configura o middleware para servir arquivos estáticos da pasta "public"
app.use(express.urlencoded({ extended: true })); // Configura o middleware para processar dados de formulários
app.use(express.json()); // Configura o middleware para processar dados em formato JSON

// Rota Raiz ("/")
router.get("/", (req, res) => {
  const { token } = req.headers; // Obtém o token do cabeçalho da solicitação

  if (token) {
    console.log("Token:", token); // Registra o token no console se estiver presente
  } else {
    res.redirect("/login"); // Redireciona para a página de login se não houver token
  }
});

// Rota "/login"
router.get("/login", (req, res) => {
  // Envia o arquivo "login.html" como resposta quando o usuário acessa http://localhost:3000/login
  res.sendFile("Pages/login.html", { root: "public" });
});

// Criação do Servidor e Escuta na Porta 3000
const httpServer = createServer(app); // Cria o servidor HTTP com base na configuração do Express
const port = 3000; // Define a porta

httpServer.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`); // Exibe mensagem no console quando o servidor está ativo
});
