const fetch = require('node-fetch');
const cheerio = require('cheerio');

const url = 'https://shop.circlesportswear.com/collections/collection-homme';

fetch(url)
  .then(response => response.text())
  .then(html => {
    const $ = cheerio.load(html);
    const products = [];

    $('.product').each((i, el) => {
      const name = $(el).find('.item__name').text().trim();
      const price = $(el).find('.price').text().trim();
      products.push({ item_name: name, price: price });
    });

    console.log(products);
  })
  .catch(console.error);
