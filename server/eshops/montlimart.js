const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://www.montlimart.com/99-vetements';

axios.get(url)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
    const productItems = $('.product-miniature');

    const products = [];

    productItems.each((i, el) => {
      const name = $(el).find('.product-title a').text().trim();
      const price = $(el).find('.price').text().trim();

      products.push({ name, price });
    });

    console.log(products);
  })
  .catch(console.error);
