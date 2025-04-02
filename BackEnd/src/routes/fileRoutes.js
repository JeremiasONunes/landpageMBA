const express = require("express");
const fileController = require("../controllers/fileController");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const router = express.Router();


const db = new sqlite3.Database("./database.db", (err) => {
    if (err) {
        console.error("Erro ao conectar ao banco de dados:", err.message);
    } else {
        console.log("Conectado ao banco de dados SQLite.");
        db.run(`
            CREATE TABLE IF NOT EXISTS leads (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                email TEXT NOT NULL,
                telefone TEXT NOT NULL,
                empresa TEXT NOT NULL,
                graduacao TEXT
            )
        `);
    }
});

router.get("/download", fileController.downloadFile);

router.post("/lead", (req, res) => {
    const { nome, email, telefone, empresa, graduacao } = req.body;

    if (!nome || !email || !telefone || !empresa) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    const stmt = db.prepare("INSERT INTO leads (nome, email, telefone, empresa, graduacao) VALUES (?, ?, ?, ?, ?)");
    stmt.run(nome, email, telefone, empresa, graduacao, function (err) {
        if (err) {
            console.error("Erro ao inserir lead no banco de dados:", err.message);
            return res.status(500).json({ error: "Erro ao salvar lead" });
        }
        console.log("Novo lead salvo com sucesso:", { nome, email, telefone, empresa, graduacao });
        res.status(201).json({
            message: "Lead salvo com sucesso",
            downloadUrl: "/api/download"
        });
    });
    stmt.finalize();
});

module.exports = router;