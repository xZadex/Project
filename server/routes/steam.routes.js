
const SteamController = require('../controllers/steam.controller')
module.exports = function(app){
    app.get('/getTop100', SteamController.getTop100Games);
    app.get('/getAllGames', SteamController.getAllGames);
}