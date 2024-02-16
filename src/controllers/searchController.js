const axios = require('axios');

exports.search = async (req, res) => {
  try {
    const query = req.query.q;
    const site = req.query.site || 'MLA';
    const sort = req.query.sort || '';
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;

    const response = await axios.get(`https://api.mercadolibre.com/sites/${site}/search?q=${query}&sort=${sort}&limit=${limit}&offset=${offset}`);

    const formattedResponse = {
      paging: {
        total: response.data.paging.total,
        offset: response.data.paging.offset,
        limit: response.data.paging.limit,
      },
      categories: response.data.categories,
      items: response.data.results.map(item => ({
        id: item.id,
        title: item.title,
        price: {
          currency: item.currency_id,
          amount: item.price,
          decimals: 2,
        },
        picture: item.thumbnail,
        condition: item.condition,
        free_shipping: item.shipping.free_shipping,
      })),
    };

    res.status(200).json(formattedResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};