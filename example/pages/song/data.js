let songs = require('../../songs.json')

module.exports = function(req, next){
  next({
    title: songs[req.params.id],
    song: songs[req.params.id]
  })
}
