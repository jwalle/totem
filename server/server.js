const express = require('express');
const path = require('path');
const request = require('request');

/* eslint-disable no-console */

const port = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.join( __dirname, '../public')));

let client_id = '09f12c7365f84dcd886d04fdb5b1c590';
let client_secret = 'b09b2f6c67884060ac98346ca8bd8427'; //TODO hide this

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
    if (error) {
        console.log('error:', error);
    }
    else if (!error && response.statusCode === 200) {
      let token = body.access_token;
      var options = {
        url: 'https://api.spotify.com/v1/users/punktumg',
        headers: {
          'Authorization' : 'Bearer ' + token
        },
          json : true
      };
      request.get(options, function (error, response, body) {
          if (error) {
              console.log('error:', error);
          }
         console.log(body)
      })
    }
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
