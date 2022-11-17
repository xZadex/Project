module.exports.getTop100Games = (req, res) => {
    const request = require('request');
    const url = "https://api.steampowered.com/ISteamChartsService/GetGamesByConcurrentPlayers/v1/";
    request(url, function(err, response, body){
        if(!err && response.statusCode < 400){
            // console.log(body);
            res.send(body);
        }
    })
}

module.exports.getAllGames = (req, res) => {
    const request = require('request');
    const url = "https://api.steampowered.com/ISteamApps/GetAppList/v1/";
    request(url, function(err, response, body){
        if(!err & response.statusCode < 400){
            res.send(body);
        }
    })
}

module.exports.getAllStreams = (req, res) => {
    const request = require('request');
    const url = "https://api.twitch.tv/helix/streams";
    request(url, function(err, response, body){
        if(!err & response.statusCode < 400){
            res.send(body);
        }
    })
}