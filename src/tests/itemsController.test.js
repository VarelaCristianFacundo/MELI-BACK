const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const itemsController = require("../controllers/itemsController");

const mock = new MockAdapter(axios);

describe("itemsController", () => {
  describe("getItem", () => {
    afterEach(() => {
      mock.reset();
    });

    it("should return the correct item details", async () => {
      const itemId = "ML123123";
      const authToken = process.env.AUTH_TOKEN;

      const itemResponse = {
        id: itemId,
        title: "Apple Watch",
        currency_id: "USD",
        price: 399.99,
        thumbnail: "apple_watch_blue.jpg",
        condition: "new",
        shipping: { free_shipping: true },
        sold_quantity: 10,
      };

      const descriptionResponse = {
        plain_text: "Apple watch blue modelo v3.",
      };

      // Mock para la solicitud de detalles del ítem
      mock
        .onGet(`https://api.mercadolibre.com/items/${itemId}`)
        .reply(200, itemResponse);

        
      // Mock para la solicitud de descripción del ítem
      mock
        .onGet(`https://api.mercadolibre.com/items/${itemId}/description`)
        .reply(200, descriptionResponse);

      // Mock para req.header
      const req = { params: { id: itemId }, header: jest.fn().mockReturnValue(authToken) };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await itemsController.getItem(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        author: {
          name: "Cristian",
          lastname: "Varela",
        },
        item: {
          id: itemId,
          title: "Apple Watch",
          price: {
            currency: "USD",
            amount: 399.99,
            decimals: 2,
          },
          picture: "apple_watch_blue.jpg",
          condition: "new",
          free_shipping: true,
          sold_quantity: 10,
          description: "Apple watch blue modelo v3.",
        },
      });
    });

    it("should handle a 404 error and return an error response", async () => {
      const itemId = "ML404"; // Simulo un ítem inexistente

      // Mock para la solicitud de detalles del ítem
      mock
        .onGet(`https://api.mercadolibre.com/items/${itemId}`)
        .reply(404);

      const req = { params: { id: itemId }, header: jest.fn() };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await itemsController.getItem(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Product does not exist" });
    });
    it("should handle a 500 error from the item details endpoint and return an error response", async () => {
        const itemId = "ML123123";
        const authToken = process.env.AUTH_TOKEN;
      
        // Mock para la solicitud de detalles del ítem con error 500
        mock
          .onGet(`https://api.mercadolibre.com/items/${itemId}`)
          .reply(500);
      
        // Mock para req.header
        const req = { params: { id: itemId }, header: jest.fn().mockReturnValue(authToken) };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      
        await itemsController.getItem(req, res);
      
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
      });
  });
});
