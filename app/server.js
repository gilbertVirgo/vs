require("dotenv").config();

const express = require("express");
const app = express();

const sms = require("./sms");
//sms.test();

const verses = require("./verses");

const now = new Date();
const firstMS = (new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0)).getTime();
const lastMS = (new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999)).getTime();
const yearMS = lastMS - firstMS;
const increment = yearMS / verses.length;

setTimeout(() => {
    
}, increment);

const {PORT} = process.env;
app.listen(PORT, () => console.log(`Starting server on port ${PORT}`));