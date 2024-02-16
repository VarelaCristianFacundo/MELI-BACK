const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const itemsController = require('../controllers/itemsController');

// Creo una instancia de axios-mock-adapter para interceptar solicitudes HTTP
const mock = new MockAdapter(axios);

// Inicio la suite de pruebas para el items controller
describe('itemsController', () => {
describe('getItem', () => {
    // Defino prueba específica para getItem
    it('should return the correct item', async () => {
      // Datos de muestra para simular una solicitud exitosa a la API de Mercado Libre
    const itemId = 'ML123123';
    const itemResponse = {
        id: itemId,
        title: 'Apple Watch',
        currency_id: 'USD',
        price: 399.99,
        thumbnail: 'apple_watch_blue.jpg',
        condition: 'new',
        shipping: { free_shipping: true },
        sold_quantity: 10,
    };

      // Datos de muestra para simular una respuesta exitosa a la solicitud de descripción
    const descriptionResponse = {
        plain_text: 'Apple watch blue modelo v3.',
    };

    // Configuro el mock para interceptar solicitudes y devolver respuestas simuladas
    mock
        .onGet(`https://api.mercadolibre.com/items/${itemId}`)
        .reply(200, itemResponse);

    mock
        .onGet(`https://api.mercadolibre.com/items/${itemId}/description`)
        .reply(200, descriptionResponse);

    // Creo objetos simulados req y res para la prueba
    const req = { params: { id: itemId } };
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };

    // Llamo a la función getItem del controller con datos simulados
    await itemsController.getItem(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
        author: {
            name: 'Cristian',
            lastname: 'Varela',
            },
            item: {
                id: itemId,
                title: 'Apple Watch',
                price: {
                    currency: 'USD',
                    amount: 399.99,
                    decimals: 2,
                },
                picture: 'apple_watch_blue.jpg',
                condition: 'new',
                free_shipping: true,
                sold_quantity: 10,
                description: 'Apple watch blue modelo v3.',
                },
            });
        });
    });
});
