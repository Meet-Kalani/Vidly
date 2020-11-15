const mongoose = require("mongoose");
const express = require("express");
const app = express();
const genres_routes = require("./routes/genres");
const customers_routes = require("./routes/customers");
const movies_routes = require("./routes/movies");
const rentals_routes = require("./routes/rentals");
const users_routes = require("./routes/users");
const login_routes = require("./routes/login");
const config = require("config");
const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth');
const { genres } = require('./models/genres');
const winston = require('winston');
const port = process.env.PORT || 5000;

process.on('uncaughtException', (ex) => {
  console.log("Something failed in startup");
  winston.error(ex.message, ex);
})

if (!config.get('jwtPrivateKey')) {
  console.error("FATAL ERROR: environment variables are not defined!");
  process.exit(1);
}

mongoose
  .connect(config.get('db'), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Connected to ${config.get('db')}...`))
  .catch((err) => console.log(err.message));

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/genres", genres_routes);
app.use("/api/customers", customers_routes);
app.use("/api/movies", movies_routes);
app.use("/api/rentals", rentals_routes);
app.use("/api/users", users_routes);
app.use("/api/login", login_routes);

app.get("/:one/:two/:three", (req, res) => {
  res.send(
    `/${req.params.one}/${req.params.two}/${req.params.three} is not available! Sorry for inconvenience`
  );
});

const server = app.listen(port, () => {
  console.log(`Server has started at port ${port}...`);
});

module.exports = server;
