// Código das rotas de inspeção

const express = require("express");
const router = express.Router();

// "Banco de dados" em memória
const inspections = [];
const ALLOWED_STATUS = ["OK", "NOK", "CRITICAL"];
// Criar nova inspeção
router.post("/", (req, res) => {
  const { equipmentId, inspector, status, notes } = req.body;

  // Validação de campos obrigatórios
  if (!equipmentId || typeof equipmentId !== "string" || equipmentId.trim() === "") {
    return res.status(400).json({
      error: "equipmentId is required and must be a non-empty string"
    });
  }

  if (!inspector || typeof inspector !== "string" || inspector.trim() === "") {
    return res.status(400).json({
      error: "inspector is required and must be a non-empty string"
    });
  }

  if (!status || !ALLOWED_STATUS.includes(status)) {
    return res.status(400).json({
      error: `status must be one of: ${ALLOWED_STATUS.join(", ")}`
    });
  }

  const inspection = {
    id: inspections.length + 1,
    equipmentId: equipmentId.trim(),
    inspector: inspector.trim(),
    status,
    notes: notes ? notes.trim() : "",
    date: new Date().toISOString()
  };

  inspections.push(inspection);

  res.status(201).json(inspection);
});


// Listar inspeções
router.get("/", (req, res) => {
  res.json(inspections);
});

module.exports = router;
