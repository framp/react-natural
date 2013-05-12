
/**
 * Module dependencies.
 */

var express = require('express')
  , consolidate = require('consolidate')
  , http = require('http')
  , path = require('path');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.engine('dust', consolidate.dust);
app.set('view engine', 'dust');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(function(req, res, next){
  if (!req.template || !req.data) 
  	return next();
  if (req.xhr)
  	return res.json({ template: req.template, data: req.data });
  res.render(req.template, req.data);
});
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var songs = [
        'Strangers In The Night', 
        'Summer Wind', 
        'It Was a Very Good Year', 
        'Somewhere In Your Heart', 
        'Forget Domani', 
        'Somethin\' Stupid', 
        'That\'s Life', 
        'Tell Her (You Love Her Each Day)', 
        'The World We Knew (Over and Over)', 
        'When Somebody Loves You', 
        'This Town', 
        'Softly, as I Leave You'
      ]
  
  app.get('/', function(req, res, next){
  	req.template = 'index';
    req.data = {
      name: 'framp'
    };
    next();
  });

  app.get('/songs', function(req, res, next){
  	req.template = 'songs';
    req.data = {
      title: "Frank Sinatra - Greatest Hits",
      songs: songs
    };
    next();
  });

  app.get('/songs/:id', function(req, res, next){
  	req.template = 'song';
    req.data = {
      title: songs[req.params['id']],
      song: songs[req.params['id']]
    };
    next();
  });

  app.post('/songs', function(req, res, next){
    var song, id = req.body.id;
    if (!(id > 0 && id < songs.length)){
      id = songs.indexOf(req.body.id);
    }
    if (id!==-1){
      song = songs[id];
    }else{
      song = "Song not found";
    }
  	req.template = 'song';
    req.data = {
      title: song,
      song: song
    };
    next();
  });


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
