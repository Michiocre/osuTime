const express = require('express');
const app = express();
const fetch = require('node-fetch');
const config = require('../config/config.json');

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    if (req.headers.origin === 'http://localhost:3000' || req.headers.origin === 'http://localhost:5000') {
        res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    } else {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:' + config.port);
    }

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

//This is how responses look like:

// let responseExample = {
//     code: 200, //200 succ, 400 err you know the deal
//     body: {}
// };

app.get('/user/:username', async (req, res) => {
    let response = {};

    let userRequest = await fetch('https://osu.ppy.sh/api/get_user' + '?' +
        'k=' + config.apiKey + '&' +
        'u=' + req.params.username, {
    });

    userRequest = await userRequest.json();

    if (userRequest[0] !== undefined) {
        let userTopRequest = await fetch('https://osu.ppy.sh/api/get_user_best' + '?' +
            'k=' + config.apiKey + '&' +
            'u=' + req.params.username + '&' +
            'limit=' + '100', {
        });
        userTopRequest = await userTopRequest.json();

        response = {
            code: 200,
            body: userTopRequest
        };
    } else {
        response = {
            code: 404,
            body: 'User not found'
        };
    }

    //res.send(math.allTimeAverage(request.top));
    res.send(response);
});

app.get('/hello', (req, res) => {
    res.send('Yeet');
});

app.listen(config.port, () => {
    console.log('Example app listening on port ' + config.port + '!');
});
