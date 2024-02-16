const axios = require('axios');

exports.getItem = async (req, res) => {
  try {
    const itemId = req.params.id;

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

    res.status(200).json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};