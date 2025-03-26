const express = require("express");
const fileController = require("../controllers/fileController");
const path = require("path");

const router = express.Router();

router.get("/download", fileController.downloadFile);


router.post("/lead", (req, res) => {
    const { nome, email, telefone, empresa, graduacao } = req.body;

    if (!nome || !email || !telefone || !empresa) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }
    //simulçao de salvamento em DB
    console.log("Novo lead recebido:", { nome, email, telefone, empresa, graduacao });

    res.status(201).json({  
        downloadUrl: "/api/download"  
    });
});

module.exports = router;
