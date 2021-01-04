import { getHTML } from "./lib/scraperSA";
import { getWSJ } from "./lib/scraperWSJ";
import { twitterWSJDataTweets } from "./lib/twitterWSJDataTweets";
import { getFearAndGreedHTML, getFearAndGreedData } from "./lib/fearandgreed";
import { downloadPDF } from "./lib/ARKholdings";
import { scraperSARocketStockNews } from "./lib/scraperSARocketStockNews";

async function go() {
  getFearAndGreedData(
    await getFearAndGreedHTML("https://money.cnn.com/data/fear-and-greed/")
  );
  await getWSJ("https://www.wsj.com/market-data/stocks?mod=nav_top_subsection");
  await twitterWSJDataTweets.twitterCredentials();
  await twitterWSJDataTweets.issuesTweet();
  await twitterWSJDataTweets.newHighLow();
  await twitterWSJDataTweets.indexVolumes();
  await twitterWSJDataTweets.percentNYSE();

  // await getHTML("https://seekingalpha.com/");
  // await scraperSARocketStockNews();
  // await downloadPDF();
}

go();
