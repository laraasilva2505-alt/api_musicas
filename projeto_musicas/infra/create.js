const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./infra/database.db', (err) => {
    if (err) {
        console.error('Erro banco:', err.message);
    } else {
        console.log('Banco OK');
        db.run(`CREATE TABLE IF NOT EXISTS musicas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            autor TEXT,
            genero TEXT,
            datalanc TEXT
        )`);
    }
});

module.exports = db;