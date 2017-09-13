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

const config = require('../config.json');
let client_id = config.client_id;
let client_secret = config.client_secrect;
let token = '';

function getToken() {
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
                reject("error :" + error);
            }
        });
    });
}

let myToken = function (req, res, next){
    if (!token) {
        getToken()
            .then((response) =>  {
                console.log(response);
                token = response;
            })
            .catch((error) => {
                console.log(error);
            });
    }
    next();
};

app.use(myToken);

app.get('/getArtist/:id', function (req, res) {
            let options = {
                url: 'https://api.spotify.com/v1/artists/' + req.params.id,
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                json: true
            };
            request.get(options, function (error, response, body) {
                if(!error && response.statusCode === 200)
                    res.send(body);
                else
                    console.log("request error :", error);
            });
    });

app.get('/getAlbums/:id', function (req, res) {
        let options = {
            url: 'https://api.spotify.com/v1/artists/' + req.params.id + '/albums?market=FR',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            json: true
        };
        request.get(options, function(error, response, body) {
            if(!error && response.statusCode === 200)
                res.send(body);
            else
                console.log("request error :", error);        });
});

app.get('/getAlbum/:id', function (req, res) {
        let options = {
            url: 'https://api.spotify.com/v1/albums/' + req.params.id,
            headers: {
                'Authorization': 'Bearer ' + token
            },
            json: true
        };
        request.get(options, function(error, response, body) {
            if(!error && response.statusCode === 200)
                res.send(body);
            else
                console.log("request error 2:", error);        });
});

app.get('/search', function (req, res) {
        let options = {
            url: 'https://api.spotify.com/v1/search?q=' + req.query.q
            + '&type=artist&limit=50',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            json: true
        };
        request.get(options, function(error, response, body) {
            if(!error && response.statusCode === 200)
                res.send(body);
            else
                console.log("request error :", error);
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