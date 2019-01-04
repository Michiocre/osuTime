const express = require('express');
const app = express();
const fetch = require('node-fetch');
const config = require('../config/config.json');
const math = require('./math.js');

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

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

app.get('/hello', (req, res) => {
    res.send('Yeet');
});

app.listen(8000, () => {
    console.log('Example app listening on port 8000!');
});
