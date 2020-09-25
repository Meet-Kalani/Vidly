const mongoose = require('mongoose');
const express = require('express');
const app = express();
const genres = require('./models/genres');
const routes = require('./router/routes');

mongoose.connect("mongodb://localhost/vidly",{ useNewUrlParser: true , useUnifiedTopology: true})
    .then(() => console.log("Connected to MongoDB..."))
    .catch(err => console.log(err.message));
    
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(genres);
app.use('/', routes);

// genres.create({
//     name: 'South'
// }, (err, createdGenre) => {
//         if (err)
//             console.log(err.message);
//         else
//             console.log(createdGenre);
// })

app.listen(5000, () => {
    console.log("Server has started at port 5000...");
})

