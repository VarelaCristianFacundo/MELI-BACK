const axios = require("axios");
const logger = require("../config/logger");
const path = require("path");
const fs = require("fs");
const { log } = require("console");

exports.search = async (req, res) => {
  try {
    const authToken = req.header("x-auth-token");
    logger.info(`Search request received with x-auth-token: ${authToken}`);

    if (authToken === process.env.AUTH_TOKEN) {
      // Lógica para el primer token
      const query = req.query.q;
      const site = req.query.site || "MLA";
      let sort = req.query.sort || "";
      const limit = parseInt(req.query.limit) || 10;
      const offset = parseInt(req.query.offset) || 0;
      if (sort != "price_asc" || sort != "price_desc") {
        sort = "";
      }
      if (isNaN(limit) || limit > 50 || limit < 0) {
        return res.status(401).send("Limit between 0 - 50");
      }
      logger.info(
        `Search request received with query: site: ${site}, sort: ${sort}, limit: ${limit}, offset: ${offset}`
      );

      const response = await axios.get(
        `https://api.mercadolibre.com/sites/${site}/search?q=${query}&sort=${sort}&limit=${limit}&offset=${offset}`
      );
      console.log(response.data);
      console.log(
        response.data.available_filters
          .find((filter) => filter.id == "category")
          ?.values.map((value) => value.name)
      );

      const formattedResponse = {
        paging: {
          total: response.data.paging.total,
          offset: response.data.paging.offset,
          limit: response.data.paging.limit,
        },
        categories:
          response.data.available_filters
            .find((filter) => filter.id == "category")
            ?.values.map((value) => value.name) ?? [],
        items: response.data.results.map((item) => ({
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
    } else if (authToken === process.env.SECOND_TOKEN) {
      // Lógica para el segundo token (datos mockeados o falsos)
      const jsonFilePath = path.join(__dirname, "..", "data", "products.json");
      try {
        const jsonData = fs.readFileSync(jsonFilePath, "utf-8");
        productsData = JSON.parse(jsonData);
        console.log("Datos cargados en memoria:", productsData);
        return res.status(200).json({ data: productsData, valido: false });
      } catch (error) {
        console.error("Error al cargar el archivo JSON:", error);
      }
    } else {
      // Caso de token no válido
      res.status(401).json({ error: "Unauthorized" });
    }
  } catch (error) {
    console.error(error);
    logger.error(`Error in search controller: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
