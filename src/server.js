import express from "express";
import inspectionsRoutes from "./routes/inspections.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

// Resolver __dirname em ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔓 CORS
app.use(cors());

// 🔹 Servir arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, "../frontend")));

// Middleware JSON
app.use(express.json());

// Rotas da API
app.use("/inspections", inspectionsRoutes);

// (Opcional) rota de status
app.get("/api", (req, res) => {
  res.json({
    application: "Engineering API",
    status: "running" 
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
