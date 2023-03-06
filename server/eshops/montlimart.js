const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://www.montlimart.com/99-vetements';

axios.get(url)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
    const newsItems = $('.products-list');

    const news = [];

    newsItems.each((i, el) => {
      const title= $(el).find('.product-miniature-title').text().trim();
      const price = $(el).find('.product-miniature-price').text().trim();
      const image = $(el).find('.productList-image').text().trim();

      news.push({ title, price});
    });

    console.log(news);
  })
  .catch(console.error);
