const fileService = require("../services/fileService");
const fs = require("fs");

const downloadFile = (req, res) => {
    const filePath = fileService.getFilePath();

    // Verifica se o arquivo existe antes de enviar
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: "Arquivo não encontrado." });
    }

    res.download(filePath, "Hello.txt", (err) => {
        if (err) {
            console.error("Erro ao baixar o arquivo:", err);
            if (!res.headersSent) {
                res.status(500).json({ message: "Erro ao baixar o arquivo." });
            }
        }
    });
};

module.exports = { downloadFile };
