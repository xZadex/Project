// api/top100Games.js

const request = require('request');

export default (req, res) => {
    const url = "https://api.steampowered.com/ISteamChartsService/GetGamesByConcurrentPlayers/v1/";

    request(url, (err, response, body) => {
        if (!err && response.statusCode < 400) {
            res.setHeader('Access-Control-Allow-Origin', 'https://steame.vercel.app');
            res.status(200).send(body);
        } else {
            res.status(500).send('Internal Server Error');
        }
    });
};