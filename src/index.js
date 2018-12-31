/*jshint esversion: 6, node: true, undef: true*/
const express = require('express');
const app = express();
const fetch = require('node-fetch');
const config = require('../config/config.json');

/* jshint ignore:start */
app.get('/user/:username', async (req, res) => {

  let userRequest = await fetch('https://osu.ppy.sh/api/get_user' + '?' +
    'k=' + config.apiKey + '&' +
    'u=' + req.params.username, {
  });

  let userTopRequest = await fetch('https://osu.ppy.sh/api/get_user_best' + '?' +
    'k=' + config.apiKey + '&' +
    'u=' + req.params.username + '&' +
    'limit=' + '100', {
  });

  let response = {
      user: await userRequest.json(),
      top: await userTopRequest.json()
  };
  
  let dates = [];

  for (play of response.top) {
      dates.push(play.date)
  }

  res.send(response.top);

});
/* jshint ignore:end */

app.listen(8000, () => {
  console.log('Example app listening on port 8000!');
});
