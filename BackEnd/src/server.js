require("dotenv").config(); 
const express = require("express");
const cors = require("cors");
const path = require("path");
const fileRoutes = require("./routes/fileRoutes");

const app = express();


app.use(cors({
    origin: process.env.CORS_ORIGIN || "*", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));


app.use(express.json());


app.use(express.static(path.join(__dirname, "public")));


app.use("/api", fileRoutes);

// Middleware de tratamento de erro global
app.use((err, req, res, next) => {
    console.error("Erro no servidor:", err);
    res.status(500).json({ error: "Erro interno do servidor" });
});

// Definir a porta do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
