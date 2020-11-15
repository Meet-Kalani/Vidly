const mongoose = require("mongoose");
const users = require("../models/users");
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require("bcrypt");
const express = require("express");
let router = express.Router();

router.post("/",async (req, res) => {
    let user = await users.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered');

    let newUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);

    users.create(newUser, (err, success) => {
        if (err) {
            console.log(err.message);
        }            
        else {
            newUser = {
                name: success.name,
                email:success.email
            }
            const token = jwt.sign({ _id: success._id }, config.get('jwtPrivateKey'));
            res.header('x-auth-token', token).send(newUser);
        }
    });
});

module.exports = router;