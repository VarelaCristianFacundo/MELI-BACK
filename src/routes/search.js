const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');
const authenticationMiddleware = require('../middleware/authentication');

router.use(authenticationMiddleware);

router.get('/', searchController.search);

module.exports = router;