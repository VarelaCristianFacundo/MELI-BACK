const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerConfig');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/search', require('./routes/search'));
app.use('/items', require('./routes/items'));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});