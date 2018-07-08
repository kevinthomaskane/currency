function htmlRoutes(app, path) {
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../index.html"));
  });
}

module.exports = htmlRoutes;
