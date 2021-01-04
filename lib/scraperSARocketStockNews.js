import express from "express";
import axios from "axios";
import Twitter from "twitter";
import db from "./db";
import md5 from "md5";

const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

// console.log(db);

async function scraperSARocketStockNews(url) {
  const rocketStocks = [
    "docu",
    "zm",
    "twlo",
    "spot",
    "snow",
    "snap",
    "roku",
    "pins",
    "pton",
    "ddog",
    "zs",
    "aapl",
    "tsla",
  ];
  for (let i = 0; i < rocketStocks.length; i++) {
    let symbol = rocketStocks[i];
    const {
      data: { data: data },
    } = await axios.get(
      `https://seekingalpha.com/api/v3/symbols/${symbol}/news`,
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

    console.log(data[0].links.self);
    let encrytedString = md5(data[0].links.self);
    console.log(encrytedString);
    db.get(`${symbol}`)
      .push({ id: encrytedString, article: data[0].links.self })
      .write();
  }
}

export { scraperSARocketStockNews };
