const fileService = require("../services/fileService");

const downloadFile = (req, res) => {
  const filePath = fileService.getFilePath();

  res.download(filePath, "Hello.txt", (err) => {
    if (err) {
      if (!res.headersSent) {
        res.status(500).json({ message: "Erro ao baixar o arquivo." });
      }
    }
  });
};

module.exports = { downloadFile };