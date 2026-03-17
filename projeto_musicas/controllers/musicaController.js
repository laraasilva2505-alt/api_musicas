const Musica = require('../models/musicas'); // ← Agora funciona!

exports.getAllMusicas = (req, res) => {
    Musica.getAllMusicas((err, musicas) => { // ← "musicas" plural
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(musicas);
        }
    });
};
