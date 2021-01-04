const fs = require("fs");
const axios = require("axios");
const { DownloaderHelper } = require("node-downloader-helper");
const pdf = require("pdf-parse");

var pdf_path =
  "UsersTraderCODEscrapecitylibARK_INNOVATION_ETF_ARKK_HOLDINGS.pdf";

function downloadPDF() {
  const dl = new DownloaderHelper(
    "https://ark-funds.com/wp-content/fundsiteliterature/holdings/ARK_INNOVATION_ETF_ARKK_HOLDINGS.pdf",
    __dirname
  );

  dl.on("end", () => console.log("Download Completed"));
  dl.start();
  let dataBuffer = fs.readFileSync(
    "Users\Trader\CODE\scrapecity\lib\ARK_INNOVATION_ETF_ARKK_HOLDINGS.pdf"
  );
  let data = pdf(dataBuffer);
  console.log(data);
}

export { downloadPDF };

// C:\Users\Trader\CODE\scrapecity\lib\ARK_INNOVATION_ETF_ARKK_HOLDINGS.pdf