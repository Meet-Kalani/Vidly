const mongoose = require('mongoose');
const express = require("express");
const app = express();

mongoose.connect("mongodb://localhost/vidly",{ useNewUrlParser: true , useUnifiedTopology: true})
    .then(() => console.log("Connected to MongoDB..."))
    .catch(err => console.log(err.message));

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
});

const genres = mongoose.model('genre', genreSchema);

// genres.create({
//     name: "Comedy"
// }, (err, createdGenre) => {
//         if (err)
//             console.log(err.message);
//         else
//             console.log(createdGenre);
// })

app.get("/", (req, res) => {
    genres.find({}, (err, foundGenres) => {
        if (err)
            res.status(404).send(err.message);
        else
            res.render('index', { genres: foundGenres });
    })
})

app.get("/api/genres/:id", (req, res) => {

    genres.findById({ _id: req.params.id }, (err, foundGenres) => {
        if (err) {
            res.status(404).send(err.message);
        }
        else {
            res.render('index', { genres: foundGenres });
        }
    })
})

app.post("/", (req, res) => {
    let newGenre = {
        name: req.body.name
    };

    if (req.body.name == "" || req.body.name.length < 3) {
        res.status(403).send("Type is required and it has to be 3 character long!");
        return;
    }

    genres.create(newGenre, (err, success) => {
        if (err)
            res.status(404).send(err.message);
        else
            res.redirect("/");
    })
})

app.put("/api/genres/:id", (req, res) => {
    let updatedGenre = {
        name: req.body.name
    }

    if (req.body.name == "" || req.body.name.length < 3) {
        res.send("Type is required and it has to be 3 character long!");
        return;
    }

    genres.update({ _id: req.params.id }, updatedGenre, (err, success) => {
        if (err)
            res.status(404).send(err.message);
        else
            res.redirect("/");
    });
})

app.delete("/api/genres/:id", (req, res) => {
    genres.deleteOne({ _id: req.params.id }, (err, success) => {
        if (err)
            res.status(404).send(err.message);
        else
            res.redirect("/");
    })
})

app.get("/:one", (req, res) => {
    res.send(`/${req.params.one} is not available! Sorry for inconvenience`);
})

app.get("/:one/:two", (req, res) => {
    res.send(`/${req.params.one}/${req.params.two} is not available! Sorry for inconvenience`);
})

app.get("/:one/:two/:three", (req, res) => {
    res.send(`/${req.params.one}/${req.params.two}/${req.params.three} is not available! Sorry for inconvenience`);
})

app.listen(3000, () => {
    console.log("Server has started at port 3000...");
})

