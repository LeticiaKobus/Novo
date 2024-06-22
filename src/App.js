import cors from "cors";
import express, { Router } from "express";
import { createServer } from "http";

const app = express();
const router = Router();
app.use(router);

app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

router.get("/", (req, res) => {
  const { token } = req.headers;

  if (token) {
    console.log("Token:", token);
  } else {
    res.redirect("/login");
  }
});

router.get("/login", (req, res) => {
  res.sendFile("Pages/login.html", { root: "public" });
});

const httpServer = createServer(app);
const port = 3000;

httpServer.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
