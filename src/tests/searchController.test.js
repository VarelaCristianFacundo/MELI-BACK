const axios = require('axios');
const searchController = require('../controllers/searchController');
const path = require('path'); 
const fs = require('fs');

jest.mock('axios');

describe('Search Controller', () => {
  it('should return formatted response for valid token', async () => {
    const req = {
      header: jest.fn().mockReturnValue(process.env.AUTH_TOKEN),
      query: { q: 'laptop' },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const axiosResponse = {
      data: {
        paging: { total: 10, offset: 0, limit: 10 },
        available_filters: [{ id: 'category', values: [{ name: 'Electronics' }] }],
        results: [
          { id: '123', title: 'Laptop', price: 500, currency_id: 'USD', thumbnail: 'laptop.jpg', condition: 'new', shipping: { free_shipping: true } },
        ],
      },
    };

    axios.get.mockResolvedValue(axiosResponse);

    await searchController.search(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      paging: {
        total: 10,
        offset: 0,
        limit: 10,
      },
      categories: ['Electronics'],
      items: [
        {
          id: '123',
          title: 'Laptop',
          price: {
            currency: 'USD',
            amount: 500,
            decimals: 2,
          },
          picture: 'laptop.jpg',
          condition: 'new',
          free_shipping: true,
        },
      ],
    });
  });

  
  it('should handle invalid tokens', async () => {
    const req = {
      header: jest.fn().mockReturnValue('invalid_token'),
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await searchController.search(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Unauthorized' });
  });

  it('should handle axios error and return 500 status', async () => {
    const req = {
      header: jest.fn().mockReturnValue(process.env.AUTH_TOKEN),
      query: { q: 'laptop' },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    axios.get.mockRejectedValue(new Error('Axios error'));

    await searchController.search(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
  });
});
