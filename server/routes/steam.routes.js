
const SteamController = require('../controllers/steam.controller')
module.exports = function(app){
    app.get('/getList', SteamController.getGames);
}