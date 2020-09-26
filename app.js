const mongoose = require('mongoose');
const express = require('express');
const app = express();
const genres = require('./models/genres');
const genres_routes = require('./routes/genres');
const customers_routes = require('./routes/customers');
const port = process.env.PORT || 5000;

mongoose.connect("mongodb://localhost/vidly",{ useNewUrlParser: true , useUnifiedTopology: true})
    .then(() => console.log("Connected to MongoDB..."))
    .catch(err => console.log(err.message));
    
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/genres', genres_routes);
app.use('/api/customers', customers_routes);

app.get("/", (req, res) => {
  genres.find({}, (err, foundGenres) => {
    if (err) res.status(404).send(err.message);
    else res.render("index", { genres: foundGenres });
  });
});

app.post("/", (req, res) => {
    let newGenre = {
      name: req.body.name
    }

    if (req.body.name == "") {
      res.status(403).send("Type is required and it has to be 3 character long!");
      return;
    }
  
    genres.create(newGenre, (err, success) => {
      if (err) res.status(404).send(err.message);
      else res.redirect("/");
    });
  });

app.get("/:one/:two/:three", (req, res) => {
    res.send(
      `/${req.params.one}/${req.params.two}/${req.params.three} is not available! Sorry for inconvenience`
    );
  });

app.listen(port, () => {
    console.log(`Server has started at port ${port}...`);
})

