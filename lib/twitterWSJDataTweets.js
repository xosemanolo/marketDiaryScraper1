const Twitter = require("twitter");
import dotenv from "dotenv";
const fs = require("fs");
const { createCanvas, loadImage } = require("canvas");
import { wsjData } from "./scraperWSJ";

dotenv.config();

const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

const width = 1000;
const height = 675;

function twitterMediaPost(data, header) {
  // Make post request on media endpoint. Pass file data as media parameter

  client.post(
    "media/upload",
    { media: data },
    function (error, media, response) {
      if (!error) {
        // If successful, a media object will be returned.
        console.log("media", media);

        // Lets tweet it
        var status = {
          status: header,
          media_ids: media.media_id_string, // Pass the media id string
        };

        client.post(
          "statuses/update",
          status,
          function (error, tweet, response) {
            if (!error) {
              console.log(tweet);
            } else {
              console.log(error);
            }
          }
        );
      }
    }
  );
}

const issues = {
  status: `**Stock Market**\n
          NYSE Adv:  ${wsjData.issuesAdvancingNYSE}
          NASDQ Adv:  ${wsjData.issuesAdvancingNASDAQ}
          NYSE Dec:  ${wsjData.issuesDecliningNYSE}
          NASDQ Dec:  ${wsjData.issuesDecliningNASDAQ}
          NYSE Unch:  ${wsjData.issuesUnchangedNYSE}
          NASDQ Unch:  ${wsjData.issuesUnchangedNASDAQ}
          NYSE:  ${wsjData.issuesTotalNYSE}
          NASDAQ:  ${wsjData.issuesTotalNASDAQ}\n
          ${wsjData.timestamp}
          `,
};

const newHighLow = {
  status: `**New High's / New Low's**\n
      NYSE New Highs: ${wsjData.newHighsNYSE}
      NASDAQ New Highs: ${wsjData.newHighsNASDAQ}
      NYSE New Lows: ${wsjData.newLowsNYSE}
      NASDAQ New Lows: ${wsjData.newLowsNASDAQ}\n
      `,
};

const volume = {
  status: `**Market Volume**\n
        NYSE Adv:  ${wsjData.advancingNYSE}
        NASDAQ Adv:  ${wsjData.advancingNASDAQ}
        NYSE Dec:  ${wsjData.decliningNYSE}
        NASDAQ Dec:  ${wsjData.decliningNASDAQ}
        NYSE Unch:  ${wsjData.unchangedNYSE}
        NASDAQ Unch:  ${wsjData.unchangedNASDAQ}
        NY ${wsjData.totalNYSE} NASQ:  ${wsjData.totalNYSE}\n
        `,
};

const twitterWSJDataTweets = {
  async issuesTweet() {
    try {
      const canvas = createCanvas(width, height);
      const context = canvas.getContext("2d");

      context.fillStyle = "#000";
      context.fillRect(0, 0, width, height);

      const text = `**Stock Markets Diary -- Issues**\n
      NYSE Advancing:  ${wsjData.issuesAdvancingNYSE}
      NYSE Declining:  ${wsjData.issuesDecliningNYSE}
      NYSE Unchanged:  ${wsjData.issuesUnchangedNYSE}
      NYSE Total:  ${wsjData.issuesTotalNYSE}
      NASDQ Advancing:  ${wsjData.issuesAdvancingNASDAQ}
      NASDQ Declining:  ${wsjData.issuesDecliningNASDAQ}
      NASDQ Unchanged:  ${wsjData.issuesUnchangedNASDAQ}
      NASDAQ Total:  ${wsjData.issuesTotalNASDAQ}\n
      ${wsjData.timestamp}
      `;

      context.font = "bold 20pt Serif";
      context.textAlign = "center";
      context.textBaseline = "center";
      context.fillStyle = "#3574d4";

      const textWidth = context.measureText(text).width;
      context.fillRect(200 - textWidth / 2, 0, 1200, 600);

      context.fillStyle = "#fff";
      context.fillText(text, 500, 250);

      context.fillStyle = "#fff";
      context.font = "bold 15pt Serif";
      context.fillText("@glitchbot.io", 500, 650);

      const buffer = canvas.toBuffer("image/png");
      fs.writeFileSync("./Images/issuesTweet.png", buffer);
      let data = fs.readFileSync("./Images/issuesTweet.png");
      let header = "**Stock Markets Diary -- Issues**";

      await twitterMediaPost(data, header);
    } catch (error) {
      console.log(error);
    }
  },
  async newHighLow() {
    try {
      const canvas = createCanvas(width, height);
      const context = canvas.getContext("2d");

      context.fillStyle = "#000";
      context.fillRect(0, 0, width, height);

      const text = `**Stock Markets Diary -- New High's & New Low's**\n
      NYSE New Highs: ${wsjData.newHighsNYSE}
      NYSE New Lows: ${wsjData.newLowsNYSE}
      NASDAQ New Highs: ${wsjData.newHighsNASDAQ}
      NASDAQ New Lows: ${wsjData.newLowsNASDAQ}\n
      ${wsjData.timestamp}
      `;

      context.font = "bold 20pt Serif";
      context.textAlign = "center";
      context.textBaseline = "center";
      context.fillStyle = "#3574d4";

      const textWidth = context.measureText(text).width;
      context.fillRect(200 - textWidth / 2, 0, 1200, 600);

      context.fillStyle = "#fff";
      context.fillText(text, 500, 250);

      context.fillStyle = "#fff";
      context.font = "bold 15pt Serif";
      context.fillText("@glitchbot.io", 500, 650);

      const buffer = canvas.toBuffer("image/png");
      fs.writeFileSync("./Images/newHighsNewLowsTweet.png", buffer);
      let data = fs.readFileSync("./Images/newHighsNewLowsTweet.png");
      let header = `** Stock Markets Diary -- New Highs & New Lows **\n
      #StockMarket #CANSlim #marketanalysis`;

      await twitterMediaPost(data, header);
    } catch (error) {
      console.log(error);
    }
  },
  async indexVolumes() {
    try {
      const canvas = createCanvas(width, height);
      const context = canvas.getContext("2d");

      context.fillStyle = "#000";
      context.fillRect(0, 0, width, height);

      const text = `**Stock Market Index Volumes**\n
      NYSE Adv:  ${wsjData.advancingNYSE}
      NYSE Dec:  ${wsjData.decliningNYSE}
      NYSE Unchanged:  ${wsjData.unchangedNYSE}
      NYSE Total: ${wsjData.totalNYSE}\n 
      NASDAQ Adv:  ${wsjData.advancingNASDAQ}
      NASDAQ Dec:  ${wsjData.decliningNASDAQ}
      NASDAQ Unchanged:  ${wsjData.unchangedNASDAQ}
      NASDAQ Total:  ${wsjData.issuesTotalNASDAQ}\n
      `;

      context.font = "bold 20pt Serif";
      context.textAlign = "center";
      context.textBaseline = "center";
      context.fillStyle = "#3574d4";

      const textWidth = context.measureText(text).width;
      context.fillRect(200 - textWidth / 2, 150, 1200, 450);

      context.fillStyle = "#fff";
      context.fillText(text, 500, 250);

      context.fillStyle = "#fff";
      context.font = "bold 15pt Serif";
      context.fillText("@glitchbot.io", 500, 650);

      const buffer = canvas.toBuffer("image/png");
      fs.writeFileSync("./Images/indexVolumes.png", buffer);
      let data = fs.readFileSync("./Images/indexVolumes.png");
      let header = `** Stock Markets Diary -- Index Volumes **\n
      #StockMarket #CANSlim #marketanalysis`;

      await twitterMediaPost(data, header);
    } catch (error) {
      console.log(error);
    }
  },
  async percentNYSE(client) {
    let num = wsjData.decliningNYSE.replace(/,/g, "");
    let den = wsjData.totalNYSE.replace(/,/g, "");

    num = parseFloat(num);
    den = parseFloat(den);

    let percentVolumeDown = num / den;

    const percentVolumeDownObj = {};

    switch (true) {
      case percentVolumeDown >= 90:
        percentVolumeDownObj.status = `Percent Volume Down on NYSE = ${(
          percentVolumeDown * 100
        ).toFixed(2)}% ** Potential Exhaustive Selling **`;
        break;
      case percentVolumeDown >= 80 && percentVolumeDown < 90:
        percentVolumeDownObj.status = `Percent Volume Down on NYSE = ${(
          percentVolumeDown * 100
        ).toFixed(2)}% ** Increased Selling Pressure **`;
        break;
      case percentVolumeDown < 79:
        percentVolumeDownObj.status = `Percent Volume Down on NYSE = ${(
          percentVolumeDown * 100
        ).toFixed(2)}%`;
        break;
      case percentVolumeDown <= 20 && percentVolumeDown < 10:
        percentVolumeDownObj.status = `Percent Volume Up on NYSE =${(
          (1 - percentVolumeDownObj) *
          100
        ).toFixed(2)}% ** Increased Buying Pressure **`;
        break;
      case percentVolumeDown <= 10:
        percentVolumeDownObj.status = `Percent Volume Up on NYSE =${(
          (1 - percentVolumeDownObj) *
          100
        ).toFixed(2)}% ** CONFIRMED Buying Pressure **`;
        break;
    }
    try {
      const canvas = createCanvas(width, height);
      const context = canvas.getContext("2d");

      context.fillStyle = "#000";
      context.fillRect(0, 0, width, height);

      const text = `NYSE Percentage of Stock Volume \n\n${percentVolumeDownObj.status}\n\n
      ${wsjData.timestamp}
      `;

      context.font = "bold 20pt Serif";
      context.textAlign = "center";
      context.textBaseline = "center";
      context.fillStyle = "#3574d4";

      const textWidth = context.measureText(text).width;
      context.fillRect(200 - textWidth / 2, 150, 1200, 450);

      context.fillStyle = "#fff";
      context.fillText(text, 500, 250);

      context.fillStyle = "#fff";
      context.font = "bold 15pt Serif";
      context.fillText("@glitchbot.io", 500, 650);

      const buffer = canvas.toBuffer("image/png");
      fs.writeFileSync("./Images/percentNYSE.png", buffer);
      let data = fs.readFileSync("./Images/percentNYSE.png");
      let header = `** Stock Markets Diary -- NYSE Volume as a Percentage **\n
      #StockMarket #CANSlim #marketanalysis`;

      await twitterMediaPost(data, header);
    } catch (error) {
      console.log(error);
    }
  },
};

export { twitterWSJDataTweets };
