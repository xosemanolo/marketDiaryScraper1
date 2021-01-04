// https://seekingalpha.com/api/v3/news?filter[category]=market-news%3A%3Aall&page[size]=5

import axios from "axios";
import cheerio from "cheerio";

const newsArticles = [];

async function getHTML(url) {
  const { data } = await axios.get(
    "https://seekingalpha.com/api/v3/news?filter[category]=market-news%3A%3Aall&page[size]=5",
    {
      headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9",
        "if-none-match": 'W/"95a407d337597bf57db81b352b98b1f1"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36",
      },

      referrer: "https://seekingalpha.com/",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: null,
      method: "GET",
      mode: "cors",
      credentials: "include",
    }
  );

  console.log(data.data[0].links.self);

  for (let i = 0; i < data.data.length; i++) {
    console.log(data.data[i].links.self);
    newsArticles.push(`https://seekingalpha.com${data.data[i].links.self}`);
  }
  console.log(newsArticles);
  return newsArticles;
}

export { getHTML, newsArticles };
