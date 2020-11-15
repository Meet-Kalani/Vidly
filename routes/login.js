const mongoose = require("mongoose");
const users = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const config = require("config");
const express = require("express");
let router = express.Router();

router.post("/",async (req, res) => {
    let user = await users.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email or Password is incorrect');

    const isValid = await bcrypt.compare(req.body.password, user.password);

    const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'));
    res.send(token);
});

module.exports = router;