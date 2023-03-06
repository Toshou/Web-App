const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://www.montlimart.com/99-vetements';

axios.get(url)
  .then(response => {
    const html = response.data;
    const products = html.products;
    
    const productNamesAndPrices = products.map(product => {
      return {
        name: product.name,
        price: product.price
      };
    });

    console.log(productNamesAndPrices );
  })
  .catch(console.error);
