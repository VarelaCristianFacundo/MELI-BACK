const winston = require('winston');
const fs = require('fs');
const path = require('path');

const logDirectory = path.join(__dirname, '..', 'logs');

// Creo la carpeta logs si no existe
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

// Configuración de logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: path.join(logDirectory, 'app.log') }),
  ],
});

module.exports = logger;
