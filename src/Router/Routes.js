import bcrypt from "bcrypt";
import dotenv from "dotenv";
import express from "express";
import fs from "fs";
import jwt from "jsonwebtoken";
import multer from "multer";
import addProductToCart from "../Server/Commands/addProductToCart.js";
import createUser from "../Server/Commands/createUser.js";
import getProductById from "../Server/Commands/getProductById.js";
import getProducts from "../Server/Commands/getProducts.js";
import getProductsOfCart from "../Server/Commands/getProductsOfCart.js";
import getUserById from "../Server/Commands/getUserById.js";
import getUserByUsername from "../Server/Commands/getUserByUsername.js";
import removeProductFromCart from "../Server/Commands/removeProductFromCart.js";

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

const router = express.Router();

// Use a chave secreta do arquivo .env
const SECRET_KEY = process.env.SECRET_KEY;

// Cria um middleware para lidar com o envio de arquivos
const upload = multer({ dest: "public/Uploads/" });

// DEFINIR ROTAS ------------------------------------------------------------------------------------------------------------------
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
      headers: {
        "Set-Cookie": `token=${token}`,
      },
    }); // Envia o arquivo "index.html" como resposta quando o usuário acessa http://localhost:3000 e o token está correto
  });
};

const carrinhoRoute = function (req, res) {
  const token = req.cookies.token; // Recebe o token armazenado no cookie "token"
  if (token == null) {
    return res.redirect("/login"); // Redireciona para a rota "/login" se o token for nulo
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.redirect("/login"); // Redireciona para a rota "/login" se o token for inválido
    }

    res.sendFile("Pages/carrinho.html", { root: "public" }); // Envia o arquivo "carrinho.html" como resposta quando o usuário acessa http://localhost:3000/carrinho e o token está correto
  });
};

const sobreRoute = function (req, res) {
  res.sendFile("Pages/sobre.html", { root: "public" }); // Envia o arquivo "sobre.html" como resposta quando o usuário acessa http://localhost:3000/sobre
};

const loginRoute = function (req, res) {
  const token = req.cookies.token; // Recebe o token armazenado no cookie "token"
  if (token != null) {
    return res.redirect("/"); // Redireciona para a rota "/" se o token existir
  }

  res.sendFile("Pages/login.html", { root: "public" }); // Envia o arquivo "login.html" como resposta quando o usuário acessa http://localhost:3000/login
};

const cadastroRoute = function (req, res) {
  res.sendFile("Pages/cadastro.html", { root: "public" }); // Envia o arquivo "cadastro.html" como resposta quando o usuário acessa http://localhost:3000/cadastro
};

const productRoute = function (req, res) {
  const { id } = req.params; // Recebe o ID do produto a partir da rota "/product/:id"

  if (id == null) {
    res.json({ success: false }); // Envia uma resposta de falha ao cliente
    return;
  }

  res.sendFile(`Pages/product.html`, { root: "public" }); // Envia o arquivo "product.html" como resposta quando o usuário acessa http://localhost:3000/product/:id
};

// -----------------------------------------------------------------------------------------------------------------------------------

const loginUser = async function (req, res) {
  const { username, password } = req.body; // Recebe os dados do formulário

  if (username == null || password == null) {
    res.json({ success: false }); // Envia uma resposta de falha ao cliente
    return;
  }

  // Verifica se o usuário existe
  const user = await getUserByUsername(username);

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
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  };

  // Verifica se o usuário existe
  const userExists = await getUserByUsername(username);
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

// -----------------------------------------------------------------------------------------------------------------------------------

const getAllProducts = async function (req, res) {
  const products = await getProducts();
  if (products == null) {
    res.json({ success: false });
  }
  res.json({ success: true, products });
};

const getOneProduct = async function (req, res) {
  const { id } = req.params;
  const product = await getProductById(id);
  if (product == null) {
    res.json({ success: false });
  }
  res.json({ success: true, product });
};

const getOneUser = async function (req, res) {
  const { id } = req.params;
  const user = await getUserById(id);
  if (user == null) {
    res.json({ success: false });
  }
  res.json({ success: true, user });
};

const getProductsByCart = async function (req, res) {
  const token = req.cookies.token;
  if (token == null) {
    res.json({ success: false });
    return;
  }

  jwt.verify(token, SECRET_KEY, async (err, decoded) => {
    if (err) {
      res.json({ success: false });
      return;
    }

    try {
      const products = await getProductsOfCart(decoded.userId);
      res.json({ success: true, products });
    } catch (error) {
      console.error(error);
      res.json({ success: false });
    }
  });
};

const adicionarCarrinho = async function (req, res) {
  const { ProductID } = req.body;
  const token = req.cookies.token;
  if (token == null) {
    res.json({ success: false });
    return;
  }

  jwt.verify(token, SECRET_KEY, async (err, decoded) => {
    if (err) {
      res.json({ success: false });
      return;
    }

    try {
      await addProductToCart(decoded.userId, ProductID);
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.json({ success: false });
    }
  });
};

const removerCarrinho = async function (req, res) {
  const { ProductID } = req.body;
  const token = req.cookies.token;
  if (token == null) {
    res.json({ success: false });
    return;
  }

  jwt.verify(token, SECRET_KEY, async (err, decoded) => {
    if (err) {
      res.json({ success: false });
      return;
    }

    try {
      await removeProductFromCart(decoded.userId, ProductID);
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.json({ success: false });
    }
  });
};

// -----------------------------------------------------------------------------------------------------------------------------------

// Configuração das rotas
router.get("/", indexRoute);
router.get("/login", loginRoute);
router.get("/sobre", sobreRoute);
router.get("/cadastro", cadastroRoute);
router.get("/carrinho", carrinhoRoute);
router.get("/product/:id", productRoute);

router.post("/cadastro", upload.single("profilePhoto"), cadastroUser);
router.post("/login", loginUser);
router.get("/logout", logout);

router.get("/products", getAllProducts);
router.get("/product/:id", getOneProduct);
router.get("/user/:id", getOneUser);

router.get("/cart", getProductsByCart);
router.post("/cart", adicionarCarrinho);
router.delete("/cart", removerCarrinho);

export default router;
