const express = require("express");
const inspectionsRoutes = require("./routes/inspections");

const app = express();
const PORT = 3000;

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
