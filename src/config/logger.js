const winston = require('winston');

const logger = winston.createLogger({
  level: 'info', // Nivel de log
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
  ],
});

module.exports = logger;
