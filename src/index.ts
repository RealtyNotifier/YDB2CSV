const fs = require("fs");
import { csvConfig } from "./config/app.config";
import { scanAll } from "./models/scan.all";
import { flattenObject } from "./services/flatten.object";

module.exports.handler = async function () {
  const items = await scanAll();
  if (!items || items?.length == 0) {
    console.log("Couldn't find items in db for such a query");
    return;
  }

  const flatItems = items?.map((i) => flattenObject(i));
  const keys = flatItems?.map((i) => Object.keys(i));
  const res = keys?.reduce((prev, curr) => {
    const t = prev.concat(curr);
    const uniqueNames = new Set(t);
    return Array.from(uniqueNames);
  });

  const columnsNames = res
    ?.filter((el) => {
      if (csvConfig.columnFilter && csvConfig.columnFilter.length > 0) {
        return csvConfig.columnFilter.some(
          (columnName) => !el.includes(columnName)
        );
      }
      return true;
    })
    .sort();

  console.log("Columns names to export: ", JSON.stringify(columnsNames));

  const tableArray = [];
  tableArray.push(columnsNames);

  flatItems?.map((item) => {
    const rowArray: string[] = [];
    columnsNames?.forEach((i) => {
      item[i] =
        typeof item[i] === "string"
          ? item[i].replaceAll(csvConfig.delimiter, " ")
          : item[i];
      rowArray.push(item[i] ? item[i] : "");
    });
    tableArray.push(rowArray);
  });

  const csv = fs.createWriteStream(csvConfig.csvFilePath, {
    flags: "w", // https://nodejs.org/api/fs.html#file-system-flags
  });
  tableArray.forEach((row) => {
    const line = row
      ?.join(csvConfig.delimiter)
      .replace(/<\/?[^>]+(>|$)/gi, "")
      .replace(/&nbsp;/gi, " ")
      .replace(/[\r\n]+/g, " ");
    csv.write(`${line}\n`);
  });
  csv.end();
  console.log("Done: ", csvConfig.csvFilePath);
  return;
};
