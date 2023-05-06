import { scanAll } from "./models/scan.all";

module.exports.handler = async function () {
  process.env.TZ = "Europe/Moscow";
  await scanAll();
};
