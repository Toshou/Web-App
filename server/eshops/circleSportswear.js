const axios = require("axios");
const cheerio = require("cheerio");
const fs = require('fs');

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
        const brand = "circleSportswear";
        const name = $(el).find("a.full-unstyled-link").first().text().trim();
        const price = $(el).find(".money").first().text().trim().replace("EUR", "€");
        products.push({ brand_name: brand, item_name: name, price: price });
      });

    //console.log(products);
    // Convert the list to JSON format
    const circleSportswearJSON = JSON.stringify(products);

    // Write the JSON to a file
    fs.writeFileSync('circleSportswear.json', circleSportswearJSON);
  })
  .catch(console.error);