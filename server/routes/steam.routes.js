
const SteamController = require('../controllers/steam.controller')
module.exports = function(app){
    app.get('/', SteamController.index);
    app.get('/getTop100', SteamController.getTop100Games);
    app.get('/getAllGames', SteamController.getAllGames);
    app.get('/getAllStreams', SteamController.getAllStreams);
}