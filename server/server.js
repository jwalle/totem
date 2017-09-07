const express = require('express');
const path = require('path');
const request = require('request');
const cookieParser = require('cookie-parser');
var querystring = require('querystring');

/* eslint-disable no-console */

const port = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.join( __dirname, '../public')))
   .use(cookieParser());

let client_id = '09f12c7365f84dcd886d04fdb5b1c590';
let client_secret = 'b09b2f6c67884060ac98346ca8bd8427'; //TODO hide this
let redirect_uri = 'http://localhost:3000/'; // Your redirect uri
// const token = getToken();

console.log('COCOUC');

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
            else
            {
                error("error");
            }
        });
    });
}



app.get('/getArtist', function (req, res) {
    getToken()
        .then(function (response) { //catch errors
            var token = response;
            console.log(response);
            // console.log('token in artist:' + token);
            // console.log('GET RTIST');
            var options = {
                url: 'https://api.spotify.com/v1/artists/6wWVKhxIU2cEi0K81v7HvP',
                // url: 'https://api.spotify.com/v1/search?q=rammstein&type=artist',
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                json: true
            };

            request.get(options, function (error, response, body) {
                console.log(body);
                res.send(body);
            });
        });
    });

app.get('/getAlbums/:id', function (req, res) {
    getToken().then(function(response){
        console.log('COUCOU TU ES DANS GET ALBUMS');
        var token = response;
        var options = {
            url: 'https://api.spotify.com/v1/artists/' + req.params.id + '/albums',
            // url: 'https://api.spotify.com/v1/search?q=rammstein&type=artist',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            json: true
        };
        console.log('URL : ' + options.url);
        request.get(options, function(error, response, body) {
        //    console.log(body);
            res.send(body);
        });
    });
});

// var generateRandomString = function(length) {
//     var text = '';
//     var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//
//     for (var i = 0; i < length; i++) {
//         text += possible.charAt(Math.floor(Math.random() * possible.length));
//     }
//     return text;
// };
//
// var stateKey = 'spotify_auth_state';


// app.get('/login', function (req, res) {
//     var state = generateRandomString(16);
//     console.log("ici c'est le login");
//     res.cookie(stateKey, state);
//
//     // your application requests authorization
//     var scope = 'user-read-private user-read-email';
//     res.redirect('https://accounts.spotify.com/authorize?' +
//         querystring.stringify({
//             response_type: 'code',
//             client_id: client_id,
//             scope: scope,
//             redirect_uri: redirect_uri,
//             state: state
//         }));
// });

// app.get('/callback', function(req, res) {
//
//     // your application requests refresh and access tokens
//     // after checking the state parameter
//
//     var code = req.query.code || null;
//     var state = req.query.state || null;
//     var storedState = req.cookies ? req.cookies[stateKey] : null;
//
//     if (state === null || state !== storedState) {
//         res.redirect('/#' +
//             querystring.stringify({
//                 error: 'state_mismatch'
//             }));
//     } else {
//         res.clearCookie(stateKey);
//         var authOptions = {
//             url: 'https://accounts.spotify.com/api/token',
//             form: {
//                 code: code,
//                 redirect_uri: redirect_uri,
//                 grant_type: 'authorization_code'
//             },
//             headers: {
//                 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
//             },
//             json: true
//         };
//
//         request.post(authOptions, function(error, response, body) {
//             if (!error && response.statusCode === 200) {
//
//                 var access_token = body.access_token,
//                     refresh_token = body.refresh_token;
//
//                 var options = {
//                     url: 'https://api.spotify.com/v1/me',
//                     headers: { 'Authorization': 'Bearer ' + access_token },
//                     json: true
//                 };
//
//                 // use the access token to access the Spotify Web API
//                 request.get(options, function(error, response, body) {
//                     console.log(body);
//                 });
//
//                 // we can also pass the token to the browser to make requests from there
//                 res.redirect('/#' +
//                     querystring.stringify({
//                         access_token: access_token,
//                         refresh_token: refresh_token
//                     }));
//             } else {
//                 res.redirect('/#' +
//                     querystring.stringify({
//                         error: 'invalid_token'
//                     }));
//             }
//         });
//     }
// });

// app.get('/refresh_token', function(req, res) {
//
//     // requesting access token from refresh token
//     var refresh_token = req.query.refresh_token;
//     var authOptions = {
//         url: 'https://accounts.spotify.com/api/token',
//         headers: {'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))},
//         form: {
//             grant_type: 'refresh_token',
//             refresh_token: refresh_token
//         },
//         json: true
//     };
//
//     request.post(authOptions, function(error, response, body) {
//         if (!error && response.statusCode === 200) {
//             var access_token = body.access_token;
//             res.send({
//                 'access_token': access_token
//             });
//         }
//     });
// });

app.get('*', function (req, res) {
  res.sendFile(path.join( __dirname, '../public/index.html'));
}); //TODO infinit loop

app.listen(port, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Server listening : http://localhost:%s', port);
  }
});
