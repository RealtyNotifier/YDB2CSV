const fs = require("fs");
import { csvConfig } from "./config/app.config";
import { scanAll } from "./models/scan.all";
import { flattenObject } from "./services/flatten.object";

module.exports.handler = async function () {
  const items = await scanAll();

  const flatItems = items?.map((i) => flattenObject(i));
  const keys = flatItems?.map((i) => Object.keys(i));
  const res = keys?.reduce((prev, curr) => {
    const t = prev.concat(curr);
    const uniqueNames = new Set(t);
    return Array.from(uniqueNames);
  });

  const columnsNames = res?.sort();

  const tableArray = [];
  tableArray.push(columnsNames);

  flatItems?.map((item) => {
    const rowArray: string[] = [];
    columnsNames?.forEach((i) => {
      rowArray.push(item[i] ? item[i] : "");
    });
    tableArray.push(rowArray);
  });

  const csv = fs.createWriteStream(csvConfig.csvFilePath, {
    flags: "w", // https://nodejs.org/api/fs.html#file-system-flags
  });
  tableArray.forEach((row) => {
    const line = row?.join(csvConfig.delimiter).replace(/\n/g, " ");
    csv.write(`${line}\n`);
  });
  csv.end();
  console.log("Done: ", csvConfig.csvFilePath);
};
