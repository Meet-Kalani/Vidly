const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let password = "Passwordisthekey@2002";



async function run() {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    console.log(salt);
    console.log(hashed);
}

run();
