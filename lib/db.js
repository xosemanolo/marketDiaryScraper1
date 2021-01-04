import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

const adapter = new FileSync("db.json");
const db = low(adapter);
db.defaults({
  aapl: [],
  tsla: [],
  docu: [],
  spot: [],
  twlo: [],
  twtr: [],
  roku: [],
  pins: [],
  pton: [],
  ddog: [],
  aapl: [],
  amd: [],
  amzn: [],
  crwd: [],
  estc: [],
  fb: [],
  fsly: [],
  ggol: [],
  net: [],
  nflx: [],
  nvda: [],
  shop: [],
  sq: [],
  splk: [],
  zm: [],
  zs: [],
  tsla: [],
  pypl: [],
  u: [],
  pltr: [],
  asan: [],
  twlo: [],
  snow: [],
}).write();
db.get("aapl").push({ id: 1, title: "lowdb is awesome" }).write();

export default db;
