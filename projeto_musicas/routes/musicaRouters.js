// routes/musicaRoutes.js
const express = require('express');
const router = express.Router();
const musicaController = require('../controllers/musicaController');

// Rota para obter todas as musicas
router.get('/', musicaController.getAllMusicas);

// Rota para obter uma única musica pelo ID
router.get('/:id', musicaController.getMusicaById);

// Rota para criar uma nova musica
router.post('/', musicaController.createMusica);

// Rota para atualizar uma musica existente
router.put('/:id', musicaController.updateMusica);

// Rota para deletar uma musica
router.delete('/:id', musicaController.deleteMusica);

module.exports = router;