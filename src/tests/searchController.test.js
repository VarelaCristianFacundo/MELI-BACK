const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const searchController = require('../controllers/searchController');

// Creo instancia del mock de Axios
const mock = new MockAdapter(axios);

// Inicio la suite de pruebas para el search controller
describe('searchController', () => {  
    describe('search', () => {
        it('should return the correct search results', async () => {      
            const query = 'apple watch';
            const site = 'MLA';
            const sort = 'price_asc';
            const limit = 5;
            const offset = 0;

        // Creo una respuesta simulada de la API de Mercado Libre
        const searchResponse = {
            paging: {
            total: 100,
            offset: offset,
            limit: limit,
            },
            categories: ['Electrónica, Audio y Video', 'Smartwatches'],
            results: [
            {
                id: 'MLA123123',
                title: 'Apple Watch Series 6',
                currency_id: 'USD',
                price: 399.99,
                thumbnail: 'apple_watch.jpg',
                condition: 'new',
                shipping: { free_shipping: true },
            },
        ],
    };

      // Configuro el mock para responder con la respuesta simulada
      mock
        .onGet(`https://api.mercadolibre.com/sites/${site}/search?q=${query}&sort=${sort}&limit=${limit}&offset=${offset}`)
        .reply(200, searchResponse);

      // Creo un objeto de solicitud simulado y un objeto de respuesta simulado
      const req = { query: { q: query, site: site, sort: sort, limit: limit, offset: offset } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Llamo a la función de búsqueda del controller
      await searchController.search(req, res);

      // Verifico que la función haya respondido con el estado y JSON correctos
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        paging: {
          total: 100,
          offset: offset,
          limit: limit,
        },
        categories: ['Electrónica, Audio y Video', 'Smartwatches'],
        items: [
          {
            id: 'MLA123123',
            title: 'Apple Watch Series 6',
            price: {
              currency: 'USD',
              amount: 399.99,
              decimals: 2,
            },
            picture: 'apple_watch.jpg',
            condition: 'new',
            free_shipping: true,
          },
        ],
      });
    });
  });
});
