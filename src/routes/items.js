const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/itemsController');
const authenticationMiddleware = require('../middleware/authentication');

router.use(authenticationMiddleware);

router.get('/:id', itemsController.getItem);

module.exports = router;