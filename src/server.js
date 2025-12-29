import express from "express";
import inspectionsRoutes from "./routes/inspections.js";
import cors from "cors";

const app = express();
const PORT = 3000;

// 🔓 CORS (libera o frontend)
app.use(cors());

// Middleware para JSON
app.use(express.json());

// Rotas
app.use("/inspections", inspectionsRoutes);

// Rota raiz
app.get("/", (req, res) => {
  res.json({
    application: "Engineering API",
    status: "running"
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
