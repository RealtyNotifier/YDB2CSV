export const flattenObject = function (obj: any) {
  const result: any = {};

  for (let i in obj) {
    if (!obj.hasOwnProperty(i)) continue;

    if (typeof obj[i] == "object" && obj[i] !== null) {
      const flatObject = flattenObject(obj[i]);
      for (let x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue;
        result[i + "_" + x] = flatObject[x];
      }
    } else {
      result[i] = obj[i];
    }
  }
  return result;
};
