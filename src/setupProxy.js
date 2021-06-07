const proxy = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    proxy({
      target: "https://open.neis.go.kr/hub/mealServiceDietInfo",
      changeOrigin: true,
    })
  );
};
