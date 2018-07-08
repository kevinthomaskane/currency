const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));

require("./routes/html_routes")(app, path);
require("./routes/cost_route")(app);

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
