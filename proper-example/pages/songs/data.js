let songs = require('../../songs.json')

module.exports = function(req, next){
  next({
    title: "Frank Sinatra - Greatest Hits",
    songs: songs
  })
}