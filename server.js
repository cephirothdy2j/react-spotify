
var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// spotify setup
var SpotifyWebApi = require('spotify-web-api-node');
var spotifyApi = new SpotifyWebApi();

app.set('port', (process.env.PORT || 3000));
app.use('/', express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// search Spotify
app.get('/api/search', function(req, res, next) {

  var artist = {};
  if(req.query && req.query.s) {
    // send the query to the spotify search api
    spotifyApi.searchArtists(req.query.s)
      .then(function(data) {
        if(data && data.body && data.body.artists && data.body.artists.items && data.body.artists.items.length)
        // if we have a response, take the first artist
        var searchResult = data.body.artists.items[0];
        // set the artist id
        artist.id = searchResult.id;
        // set the artist name
        artist.name = searchResult.name;
        // get the first image and use it as the thumbnail
        if(searchResult.images && searchResult.images.length) {
          artist.imageUrl = searchResult.images[0] && searchResult.images[0].url || null;
        }
        return artist;
      }, function(err) {
        return res.json(err);
      })
      .then(function(artist) {
        // get the artist's albums
        return spotifyApi.getArtistAlbums(artist.id);
      }).then(function(albums) {
        artist.albums = [];
        if(albums && albums.body && albums.body.items && albums.body.items.length) {
          for(var i = 0; i < albums.body.items.length; i++) {
            // cut down on the amount of data we're retuning to the front end.
            artist.albums.push({
              id : albums.body.items[i].id,
              name : albums.body.items[i].name,
              imageUrl : albums.body.items[i].images && albums.body.items[i].images.length && albums.body.items[i].images[0].url || null
            });
          }
        }
        return res.json(artist);        
      });
  } else {
    next();
  }
});


// app home
app.get('/', function(req, res, next) {
  res.render('index');
});

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
