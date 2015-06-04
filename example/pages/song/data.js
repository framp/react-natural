let songs = require('../../songs.json')

module.exports = function(req, next){
  next({
    song: songs[req.params.id]
  })
}
