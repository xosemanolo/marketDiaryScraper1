
import { getWSJ } from "./lib/scraperWSJ";
import { twitterWSJDataTweets } from "./lib/twitterWSJDataTweets";
import { getFearAndGreedHTML, getFearAndGreedData } from "./lib/fearandgreed";


async function go() {
  // getFearAndGreedData(
  //   await getFearAndGreedHTML("https://money.cnn.com/data/fear-and-greed/")
  // );
  await getWSJ("https://www.wsj.com/market-data/stocks?mod=nav_top_subsection");
  await twitterWSJDataTweets.issuesTweet();
  await twitterWSJDataTweets.newHighLow();
  await twitterWSJDataTweets.indexVolumes();
  await twitterWSJDataTweets.percentNYSE();

 
}

go();
