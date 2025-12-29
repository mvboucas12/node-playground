import express from "express";
import prisma from "../prisma.js";

const router = express.Router();

const ALLOWED_STATUS = ["OK", "NOK", "CRITICAL"];

// Criar nova inspeção
router.post("/", async (req, res) => {
  try {
    const { equipmentId, inspector, status, notes } = req.body;

    if (!equipmentId || typeof equipmentId !== "string" || equipmentId.trim() === "") {
      return res.status(400).json({ error: "equipmentId is required" });
    }

    if (!inspector || typeof inspector !== "string" || inspector.trim() === "") {
      return res.status(400).json({ error: "inspector is required" });
    }

    if (!ALLOWED_STATUS.includes(status)) {
      return res.status(400).json({
        error: `status must be one of: ${ALLOWED_STATUS.join(", ")}`
      });
    }

    const inspection = await prisma.inspection.create({
      data: {
        equipmentId: equipmentId.trim(),
        inspector: inspector.trim(),
        status,
        notes
      }
    });

    res.status(201).json(inspection);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Listar inspeções
router.get("/", async (req, res) => {
  try {
    const inspections = await prisma.inspection.findMany({
      orderBy: {
        createdAt: "desc"
      }
    });

    res.json(inspections);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
