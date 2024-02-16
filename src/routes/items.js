const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/itemsController');
const authenticationMiddleware = require('../middleware/authentication');

router.use(authenticationMiddleware);
/**
 * @swagger
 * /items:
 *   get:
 *     summary: Obtiene la lista de items.
 *     description: Retorna la lista de items disponibles.
 *     responses:
 *       '200':
 *         description: Éxito, devuelve la lista de items.
 *       '500':
 *         description: Error del servidor.
 */

router.get('/:id', itemsController.getItem);

module.exports = router;