require('dotenv').config();

module.exports.index = (req, res) => {
    res.json({
        message: "Hello SteaMe"
    });
}

module.exports.getTop100Games = (req, res) => {
    const request = require('request');
    const url = "https://api.steampowered.com/ISteamChartsService/GetGamesByConcurrentPlayers/v1/";
    request(url, function(err, response, body){
        if(!err && response.statusCode < 400){
            res.header('Access-Control-Allow-Origin', `${process.env.HEADER}`);
            res.send(body);
        }
    })
}

module.exports.getAllGames = (req, res) => {
    const request = require('request');
    const url = "https://api.steampowered.com/ISteamApps/GetAppList/v1/";
    request(url, function(err, response, body){
        if(!err & response.statusCode < 400){
            res.header('Access-Control-Allow-Origin', `${process.env.HEADER}`);
            res.send(body);
        }
    })
}

module.exports.getAllStreams = (req, res) => {
    const request = require('request');
    const url = "https://api.twitch.tv/helix/streams";
    request(url, function(err, response, body){
        if(!err & response.statusCode < 400){
            res.header('Access-Control-Allow-Origin', `${process.env.HEADER}`);
            res.send(body);
        }
    })
}