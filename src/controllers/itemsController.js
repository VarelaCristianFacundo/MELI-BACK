const axios = require('axios');
const logger = require('../config/logger');

exports.getItem = async (req, res) => {
  try {
    const authToken = req.header('x-auth-token');
    logger.info(`Request to get item details with x-auth-token: ${authToken}`);

    if (authToken === process.env.AUTH_TOKEN) {
      // Lógica para el primer token
      const itemId = req.params.id;
      logger.info(`Request to get details of item with ID: ${itemId}`);

      const itemResponse = await axios.get(`https://api.mercadolibre.com/items/${itemId}`);
      const descriptionResponse = await axios.get(`https://api.mercadolibre.com/items/${itemId}/description`);

      const itemData = {
        id: itemResponse.data.id,
        title: itemResponse.data.title,
        price: {
          currency: itemResponse.data.currency_id,
          amount: itemResponse.data.price,
          decimals: 2,
        },
        picture: itemResponse.data.thumbnail,
        condition: itemResponse.data.condition,
        free_shipping: itemResponse.data.shipping.free_shipping,
        sold_quantity: itemResponse.data.sold_quantity,
        description: descriptionResponse.data.plain_text,
      };

      const responseData = {
        author: {
          name: "Cristian", 
          lastname: "Varela",  
        },
        item: itemData,
      };

      logger.info(`Details of item with ID ${itemId} obtained successfully.`);

      res.status(200).json(responseData);
    } else if (authToken === process.env.SECOND_TOKEN) {
      // Lógica para el segundo token (datos mockeados o falsos)
      res.status(200).json({ data: 'datos_mockeados', valido: false });
    } else {
      // Caso de token no válido
      res.status(401).json({ error: 'Unauthorized' });
    }
  } catch (error) {
    logger.error(`Error processing the request: ${error.message}`);
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};