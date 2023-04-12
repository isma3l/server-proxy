const express = require('express');
const request = require('request');
const path = require('path');
const cors = require('cors');

const itunesUrl = "https://itunes.apple.com";

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));

const router = express.Router();

router.get('/podcasts', (req, res) => {
    const url = `${itunesUrl}/us/rss/toppodcasts/limit=100/genre=1310/json`;
    request(url).pipe(res);
})

router.get('/podcasts/:id', (req, res) => {
    const podcastId = req.params.id;
    const url = `${itunesUrl}/lookup?id=${podcastId}`;
    request(url).pipe(res);
})

router.get('/episodes', (req, res) => {
    const feedurl = req.query.feedurl;
    request(feedurl).pipe(res).on("error", (err) => {
        res.status(500).send("Error connecting");
    })
})

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
})

app.use("/api", router);

module.exports = app;