const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/itemsController');
const authenticationMiddleware = require('../middleware/authentication');

router.use(authenticationMiddleware);

/**
 * @swagger
 * /items/{id}:
 *   get:
 *     tags:
 *       - Item
 *     summary: Obtiene un item por su ID.
 *     description: Retorna los detalles de un item específico.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del item a obtener.
 *         schema:
 *           type: string
 *     security:
 *       - xAuth: []
 *     responses:
 *       200:
 *         description: Éxito, devuelve los detalles del item.
 *       500:
 *         description: Error del servidor.
 *     operationId: getItemById
 */
router.get('/:id', itemsController.getItem);

module.exports = router;
