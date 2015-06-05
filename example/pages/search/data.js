let songs = require('../../songs.json')

module.exports = function(req, next){
  let search = (req.body.search || '').toLowerCase()
  next({
    search: req.body.search || '*',
    songs: songs.filter(function(value){
      return value.toLowerCase().indexOf(search)!==-1
    })
  })
}
