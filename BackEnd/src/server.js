const express = require("express");
const cors = require("cors");
const fileRoutes = require("./routes/fileRoutes");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());


app.use(express.static(path.join(__dirname, "public")));

app.use("/api", fileRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));