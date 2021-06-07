const proxy = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    proxy("/api", {
      target: "https://open.neis.go.kr",
      changeOrigin: true,
      pathRewrite: { "^/api": "" },
    })
  );
};
