let songs = require('../../songs.json')

module.exports = function(req, next){
  let id = songs.indexOf(req.body.song)
  next({
    song: songs[id] || 'Song not found'
  })
}
