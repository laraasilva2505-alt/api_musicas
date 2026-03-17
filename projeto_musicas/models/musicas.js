const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../infra/database.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Erro banco:', err.message);
    } else {
        console.log('Banco conectado com sucesso');
        db.run(`CREATE TABLE IF NOT EXISTS musicas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            autor TEXT NOT NULL,
            genero TEXT,
            datalanc TEXT
        )`, (err) => {
            if (err) console.error('Erro tabela:', err);
        });
    }
});

function getAllMusicas(callback) {
    db.all("SELECT * FROM musicas", (err, rows) => {
        callback(err, rows);
    });
}

function getMusicaById(id, callback) {
    db.get("SELECT * FROM musicas WHERE id = ?", [id], (err, row) => {
        callback(err, row);
    });
}

function createMusica(musica, callback) {
    const { nome, autor, genero, datalanc } = musica;
    db.run("INSERT INTO musicas (nome, autor, genero, datalanc) VALUES (?, ?, ?, ?)",
        [nome, autor, genero || null, datalanc || null],
        function(err) {
            callback(err, { id: this.lastID });
        });
}

function updateMusica(id, musica, callback) {
    const { nome, autor, genero, datalanc } = musica;
    db.run("UPDATE musicas SET nome = ?, autor = ?, genero = ?, datalanc = ? WHERE id = ?",
        [nome, autor, genero || null, datalanc || null, id],
        function(err) {
            callback(err, { changes: this.changes });
        });
}

function deleteMusica(id, callback) {
    db.run("DELETE FROM musicas WHERE id = ?", [id], function(err) {
        callback(err, { changes: this.changes });
    });
}

// Fecha conexão quando app encerrar
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) console.error(err.message);
        console.log('Conexão fechada.');
        process.exit(0);
    });
});

module.exports = {
    getAllMusicas,
    getMusicaById,
    createMusica,
    updateMusica,
    deleteMusica
};