module.exports.handler = async function () {
  process.env.TZ = "Europe/Moscow";
  console.log("hi");
};
