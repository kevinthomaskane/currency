function htmlRoutes(app, path) {

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../index.html"));
  });

  app.get("/css", function(req, res) {
    res.sendFile(path.join(__dirname, "../css/main.css"));
  });
}

module.exports = htmlRoutes;
