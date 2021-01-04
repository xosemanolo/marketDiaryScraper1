import axios from "axios";

const wsjData = {};

async function getWSJ(url) {
  const {
    data: {
      data: { instrumentSets, timestamp },
    },
  } = await axios.get(
    "https://www.wsj.com/market-data/stocks?id=%7B%22application%22%3A%22WSJ%22%2C%22marketsDiaryType%22%3A%22overview%22%7D&type=mdc_marketsdiary"
  );

  wsjData.issuesAdvancingNASDAQ = instrumentSets[0].instruments[0].NASDAQ;
  wsjData.issuesAdvancingNYSE = instrumentSets[0].instruments[0].NYSE;
  wsjData.issuesDecliningNASDAQ = instrumentSets[0].instruments[1].NASDAQ;
  wsjData.issuesDecliningNYSE = instrumentSets[0].instruments[1].NYSE;
  wsjData.issuesUnchangedNASDAQ = instrumentSets[0].instruments[2].NASDAQ;
  wsjData.issuesUnchangedNYSE = instrumentSets[0].instruments[2].NYSE;
  wsjData.issuesTotalNASDAQ = instrumentSets[0].instruments[3].NASDAQ;
  wsjData.issuesTotalNYSE = instrumentSets[0].instruments[3].NYSE;

  wsjData.newHighsNASDAQ = instrumentSets[1].instruments[0].NASDAQ;
  wsjData.newHighsNYSE = instrumentSets[1].instruments[0].NYSE;
  wsjData.newLowsNASDAQ = instrumentSets[1].instruments[1].NASDAQ;
  wsjData.newLowsNYSE = instrumentSets[1].instruments[1].NYSE;

  wsjData.totalNASDAQ = instrumentSets[2].instruments[0].NASDAQ;
  wsjData.totalNYSE = instrumentSets[2].instruments[0].NYSE;
  wsjData.advancingNASDAQ = instrumentSets[2].instruments[1].NASDAQ;
  wsjData.advancingNYSE = instrumentSets[2].instruments[1].NYSE;
  wsjData.decliningNASDAQ = instrumentSets[2].instruments[2].NASDAQ;
  wsjData.decliningNYSE = instrumentSets[2].instruments[2].NYSE;
  wsjData.unchangedNASDAQ = instrumentSets[2].instruments[3].NASDAQ;
  wsjData.unchangedNYSE = instrumentSets[2].instruments[3].NYSE;
  wsjData.timestamp = timestamp;

  return wsjData;
}

export { getWSJ, wsjData };
