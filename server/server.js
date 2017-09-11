'use strict';

const express = require('express');
const path = require('path');
const request = require('request');
const cookieParser = require('cookie-parser');

/* eslint-disable no-console */

const port = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.join( __dirname, '../public')))
   .use(cookieParser());

let client_id = '09f12c7365f84dcd886d04fdb5b1c590';
let client_secret = 'b09b2f6c67884060ac98346ca8bd8427'; //TODO hide this

function getToken() { //TODO hide in middleware
    return new Promise(function(resolve, error)
    {
        var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            headers: {
                'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
            },
            form: {
                grant_type: 'client_credentials'
            },
            json: true
        };
        request.post(authOptions, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                resolve(body.access_token);
            }
            else {
                error("error :" + error);
            }
        });
    });
}

app.get('/getArtist/:id', function (req, res) {
    var self = req;
    getToken()
        .then(function (response) { //catch errors
            var options = {
                url: 'https://api.spotify.com/v1/artists/' + self.params.id,
                headers: {
                    'Authorization': 'Bearer ' + response
                },
                json: true
            };
            request.get(options, function (error, response, body) {
                res.send(body);
            });
        });
    });

app.get('/getAlbums/:id', function (req, res) {
    getToken().then(function(response){
        var options = {
            url: 'https://api.spotify.com/v1/artists/' + req.params.id + '/albums',
            headers: {
                'Authorization': 'Bearer ' + response
            },
            json: true
        };
        request.get(options, function(error, response, body) {
            res.send(body);
        });
    });
});

app.get('/getAlbum/:id', function (req, res) {
    getToken().then(function(response){
        var options = {
            url: 'https://api.spotify.com/v1/albums/' + req.params.id,
            headers: {
                'Authorization': 'Bearer ' + response
            },
            json: true
        };
        request.get(options, function(error, response, body) {
            res.send(body);
        });
    });
});

app.get('/search', function (req, res) {
    getToken().then(function(response){
        var options = {
            url: 'https://api.spotify.com/v1/search?q=' + req.query.q
            + '&type=artist&limit=50',
      //       data: {
            //     query: req.query.q,
            //     type : 'artist'
            // },
            headers: {
                'Authorization': 'Bearer ' + response
            },
            json: true
        };
        request.get(options, function(error, response, body) {
            res.send(body);
        });
    });
});

app.get('*', function (req, res) {
  res.sendFile(path.join( __dirname, '../public/index.html'));
});

app.listen(port, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Server listening : http://localhost:%s', port);
  }
});