const axios = require('axios');
const logger = require('../config/logger');

exports.getItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    logger.info(`Solicitud para obtener detalles del ítem con ID: ${itemId}`);

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

    logger.info(`Detalles del ítem con ID ${itemId} obtenidos correctamente.`);

    res.status(200).json(responseData);
  } catch (error) {
    logger.error(`Error al procesar la solicitud: ${error.message}`);
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};