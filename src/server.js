const express = require("express");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.json({
    message: "API de Engenharia rodando com sucesso, com ajuda do CHATGPT",
    status: "OK",
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});