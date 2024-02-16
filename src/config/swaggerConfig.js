const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mercado Libre API',
      version: '1.0.0',
      description: 'Documentación de la API de Mercado Libre',
    },
    components: {
      securitySchemes: {
        xAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'x-auth-token',
        },
      },
    },
  },
  apis: [`./routes/*.js`],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
