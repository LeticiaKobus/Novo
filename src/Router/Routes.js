import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

const router = express.Router();

// Use a chave secreta do arquivo .env
const SECRET_KEY = process.env.SECRET_KEY;

const indexRoute = function (req, res) {
  const token = req.cookies.token; // Recebe o token armazenado no cookie "token"
  if (token == null) {
    return res.redirect("/login"); // Redireciona para a rota "/login" se o token for nulo
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.redirect("/login"); // Redireciona para a rota "/login" se o token for inválido
    }

    res.sendFile("index.html", {
      root: "public",
      headers: { "Set-Cookie": `token=${token}` },
    }); // Envia o arquivo "index.html" como resposta quando o usuário acessa http://localhost:3000 e o token está correto
  });
};

const loginRoute = function (req, res) {
  const token = req.cookies.token; // Recebe o token armazenado no cookie "token"
  if (token != null) {
    return res.redirect("/"); // Redireciona para a rota "/" se o token existir
  }

  res.sendFile("Pages/login.html", { root: "public" }); // Envia o arquivo "login.html" como resposta quando o usuário acessa http://localhost:3000/login
};

const login = function (req, res) {
  const { username, password } = req.body; // Recebe os dados do formulário

  if (username === "admin" && password === "admin") {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" }); // Cria um token JWT com validade de 1 hora
    res.cookie("token", token, { httpOnly: true, maxAge: 3600000 }); // Armazena o token em um cookie
    res.json({ success: true }); // Envia uma resposta de sucesso ao cliente
  } else {
    res.json({ success: false, message: "Nome de usuário ou senha inválidas" }); // Envia uma resposta de erro ao cliente
  }
};

// Configuração das rotas
router.get("/", indexRoute);
router.get("/login", loginRoute);
router.post("/login", login);

export default router;
