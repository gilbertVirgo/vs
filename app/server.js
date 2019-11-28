require("dotenv").config();
const path = require("path");

const fs = require("fs").promises;
const com = require("./server/com");

const init = async () => {
    const verses = JSON.parse(await fs.readFile(path.join(__dirname, "server", "verses.json"), "utf-8"));
    const profiles = JSON.parse(await fs.readFile(path.join(__dirname, "server", "profiles.json"), "utf-8"));

    com.init({verses, profiles});
}

const express = require("express");
const server = express();

server.use(express.static(path.join(__dirname, 'build')));

server.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const {PORT} = process.env;
server.listen(PORT, () => {
    init();
    console.log(`Starting server on port ${PORT}`)
});

// TODO: test!