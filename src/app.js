const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/search', require('./routes/search'));
app.use('/items', require('./routes/items'));


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});