module.exports.getGames = (req, res) => {
    var request = require('request');
    var url = "https://api.steampowered.com/ISteamChartsService/GetGamesByConcurrentPlayers/v1/";
    request(url, function(err, response, body){
        if(!err && response.statusCode < 400){
            // console.log(body);
            res.send(body);
        }
    })
}