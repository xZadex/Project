const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors(
    {
        origin: ["https://steame.vercel.app"],
        methods:["POST", "GET"],
        credentials: true
    }
));

app.use(express.json());

app.get("/", (req, res) => {
    res.json("Hello again SteaME!");
});

app.get("/top100Games", (req, res) => {
    const request = require('request');
    const url = "https://api.steampowered.com/ISteamChartsService/GetGamesByConcurrentPlayers/v1/";
    request(url, function(err, response, body){
        if(!err && response.statusCode < 400){
            // console.log(body);
            res.header('Access-Control-Allow-Origin', 'https://steame.vercel.app');
            res.send(body);
        }
    })
});

app.listen(3001, () => {
    console.log("Server is running on port 3001")
})