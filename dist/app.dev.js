"use strict";

var express = require("express");

var app = express();

var genres = require('./genres');

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(genres);
app.listen(3000, function () {
  console.log("Server has started at port 3000...");
});