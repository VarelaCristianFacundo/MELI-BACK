const express = require("express");
const router = express.Router();
const searchController = require("../controllers/searchController");
const authenticationMiddleware = require("../middleware/authentication");

router.use(authenticationMiddleware);
/**
 * @swagger
 * /search:
 *   get:
 *     summary: Obtiene la lista de items.
 *     tags: [Search]
 *     description: Retorna la lista de items disponibles.
 *     parameters:
 *       - in: query
 *         name: sort
 *         required: false
 *         description: Ordenar por precio (price_asc o price_desc).
 *         schema:
 *           type: string
 *     security:
 *       - xAuth: []
 *     responses:
 *       200:
 *         description: Éxito, devuelve la lista de items.
 *       500:
 *         description: Error del servidor.
 */
router.get("/", searchController.search);

module.exports = router;
