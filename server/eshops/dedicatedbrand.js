

const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://www.dedicatedbrand.com/en/men/news';

axios.get(url)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
    const newsItems = $('.product-list-item');

    const news = [];

    newsItems.each((i, el) => {
      const name= $(el).find('.product-name').text().trim();
      const price = $(el).find('.product-price').text().trim();
      const image = $(el).find('.product-image img').attr('src');

      news.push({ title, price, image });
    });

    console.log(news);
  })
  .catch(console.error);
