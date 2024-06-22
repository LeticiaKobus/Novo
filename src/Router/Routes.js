import bcrypt from "bcrypt";
import dotenv from "dotenv";
import express from "express";
import fs from "fs";
import jwt from "jsonwebtoken";
import multer from "multer";
import createUser from "../Server/Commands/createUser.js";
import getUser from "../Server/Commands/getUser.js";

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

const router = express.Router();

// Use a chave secreta do arquivo .env
const SECRET_KEY = process.env.SECRET_KEY;

// Cria um middleware para lidar com o envio de arquivos
const upload = multer({ dest: "public/Uploads/" });

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

const loginUser = async function (req, res) {
  const { username, password } = req.body; // Recebe os dados do formulário

  if (username == null || password == null) {
    res.json({ success: false }); // Envia uma resposta de falha ao cliente
    return;
  }

  // Verifica se o usuário existe
  const user = await getUser(username);

  if (user == null) {
    res.json({ success: false, message: "Usuário não encontrado." }); // Envia uma resposta de falha ao cliente
    return;
  }

  try {
    const match = await bcrypt.compare(password, user.PasswordHash);
    if (match) {
      const token = jwt.sign({ userId: user.UserID }, SECRET_KEY, {
        expiresIn: "1h",
      }); // Cria um token JWT com validade de 1 hora
      res.cookie("token", token, { httpOnly: true, maxAge: 3600000 }); // Armazena o token em um cookie
      res.json({ success: true, message: "Login bem-sucedido." }); // Envia uma resposta de sucesso ao cliente
    } else {
      res.json({ success: false, message: "Senha inválida." }); // Envia uma resposta de falha ao cliente
    }
  } catch (err) {
    console.error("Erro ao verificar a senha:", err);
  }
};

const cadastroRoute = function (req, res) {
  res.sendFile("Pages/cadastro.html", { root: "public" }); // Envia o arquivo "cadastro.html" como resposta quando o usuário acessa http://localhost:3000/cadastro
};

const cadastroUser = async function (req, res) {
  const { fullname, email, birthday, telephone, username, password } = req.body; // Recebe os dados do formulário
  const profilePhoto = req.file;

  if (
    profilePhoto == null ||
    fullname == null ||
    email == null ||
    birthday == null ||
    telephone == null ||
    username == null ||
    password == null
  ) {
    res.json({ success: false, message: "Preencha todos os campos." }); // Envia uma resposta de falha ao cliente
    return;
  }

  // Função para criptografar a senha
  const hashPassword = (password) => {
    return bycript.hashSync(password, bycript.genSaltSync(10));
  };

  // Verifica se o usuário existe
  const userExists = await getUser(username);
  if (userExists != null) {
    res.json({ success: false, message: "Usuário já existe." }); // Envia uma resposta de falha ao cliente
    return;
  }

  // Cria o usuário
  const user = await createUser(
    fs.readFileSync(profilePhoto.path),
    fullname,
    email,
    birthday,
    telephone,
    username,
    hashPassword(password)
  );

  if (user == null) {
    res.json({ success: false, message: "Erro ao cadastrar usuário." }); // Envia uma resposta de falha ao cliente
    return;
  }

  // Cria um token JWT com validade de 1 hora
  const token = jwt.sign({ user }, SECRET_KEY, { expiresIn: "1h" });
  res.cookie("token", token, { httpOnly: true, maxAge: 3600000 }); // Armazena o token em um cookie

  res.json({ success: true }); // Envia uma resposta de sucesso ao cliente
};

const logout = function (req, res) {
  res.clearCookie("token"); // Limpa o cookie "token"
  res.json({ success: true }); // Envia uma resposta de sucesso ao cliente
};

// Configuração das rotas
router.get("/", indexRoute);

router.get("/login", loginRoute);
router.post("/login", loginUser);

router.get("/cadastro", cadastroRoute);
router.post("/cadastro", upload.single("profilePhoto"), cadastroUser);

router.get("/logout", logout);

export default router;
