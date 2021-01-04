const fs = require("fs");
import axios from "axios";
import cheerio from "cheerio";
const Twitter = require("twitter");
const { createCanvas, loadImage } = require("canvas");

const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

async function getFearAndGreedHTML(url) {
  const { data: html } = await axios.get(
    "https://money.cnn.com/data/fear-and-greed/"
  );

  return html;
}

async function getFearAndGreedData(html) {
  try {
    const $ = cheerio.load(html);
    const fearNow = $("#needleChart > ul > li:nth-child(1)").text().trim();
    const previousClose = $("#needleChart > ul > li:nth-child(2)")
      .text()
      .trim();
    const oneWeekAgo = $("#needleChart > ul > li:nth-child(3)").text().trim();
    const oneMonthAgo = $("#needleChart > ul > li:nth-child(4)").text().trim();
    const oneYearAgo = $("#needleChart > ul > li:nth-child(5)").text().trim();
    const timestamp = $("#needleAsOfDate").text();

    console.log(
      fearNow,
      previousClose,
      oneWeekAgo,
      oneMonthAgo,
      oneYearAgo,
      timestamp.slice(12)
    );

    const fearAndGreedLoad = {
      status: `**Fear & Greed Index**\n
        ${fearNow}
        ${previousClose}
        ${oneWeekAgo}
        ${oneMonthAgo}
        ${timestamp.slice(12)}`,
    };

    const width = 1000;
    const height = 675;

    const canvas = createCanvas(width, height);
    const context = canvas.getContext("2d");

    context.fillStyle = "#000";
    context.fillRect(0, 0, width, height);

    const text = `CNN Fear & Greed index \n
    ${fearNow}
    ${previousClose}
    ${oneWeekAgo}
    ${oneMonthAgo}\n
    ${timestamp}`;

    context.font = "bold 25pt Serif";
    context.textAlign = "center";
    context.textBaseline = "center";
    context.fillStyle = "#3574d4";

    const textWidth = context.measureText(text).width;
    context.fillRect(500 - textWidth / 2 - 10, 200 - 5, textWidth + 20, 350);

    context.fillStyle = "#fff";
    context.fillText(text, 500, 250);

    context.fillStyle = "#fff";
    context.font = "bold 20pt Serif";
    context.fillText("@glitchbot.io", 500, 600);

    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync("./test.png", buffer);

    let data = fs.readFileSync("test.png");

    // Make post request on media endpoint. Pass file data as media parameter
    client.post(
      "media/upload",
      { media: data },
      function (error, media, response) {
        if (!error) {
          // If successful, a media object will be returned.
          console.log(media);

          // Lets tweet it
          var status = {
            status:
              "CNN Fear & Greed \n https://money.cnn.com/data/fear-and-greed/ \n #fearandgreed #stockmarketdata #wallstreet",
            media_ids: media.media_id_string, // Pass the media id string
          };

          client.post(
            "statuses/update",
            status,
            function (error, tweet, response) {
              if (!error) {
                console.log(tweet);
              }
            }
          );
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
}

export { getFearAndGreedHTML, getFearAndGreedData };
