const express = require('express');
const app = express();
const fetch = require('node-fetch');
const config = require('../config/config.json');
const math = require('./math.js');

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

    let request = {
        user: await userRequest.json(),
        top: await userTopRequest.json()
    };

    request.top.sort(math.dateCompare);

    //res.send(math.allTimeAverage(request.top));
    res.send(request.top);
});

app.listen(8000, () => {
    console.log('Example app listening on port 8000!');
});
