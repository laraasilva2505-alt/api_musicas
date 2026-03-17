const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());

// Garante que a pasta infra existe
const fs = require('fs');
const infraPath = path.join(__dirname, 'infra');
if (!fs.existsSync(infraPath)) {
    fs.mkdirSync(infraPath);
}

const musicaRoutes = require('./routes/musicaRoutes');
app.use('/musica', musicaRoutes);

app.listen(port, () => {
    console.log(`Servidor: http://localhost:${port}`);
});