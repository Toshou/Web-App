const axios = require("axios");
const cheerio = require("cheerio");

const url = "https://shop.circlesportswear.com/collections/collection-homme";

axios
  .get(url)
  .then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    const products = [];

    $("#product-grid")
      .find("li")
      .each((i, el) => {
        const name = $(el).find("a.full-unstyled-link").first().text().trim();
        const price = $(el).find(".money").first().text().trim();
        products.push({ item_name: name, price: price });
      });

    console.log(products);
  })
  .catch(console.error);