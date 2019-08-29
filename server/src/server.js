const express = require('express');
const app = express();
const fetch = require('node-fetch');
const config = require('./config/config.json');
var childProcess = require('child_process');

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

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

app.get('/osuTime/backend/user/:username', async (req, res) => {
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

        response = userTopRequest;
        res.status(200);
    } else {
        response = '{"Message":"User not found"}';
        res.status(404);
    }

    //res.send(math.allTimeAverage(request.top));
    res.send(response);
});

app.get('/osuTime/backend/hello', (req, res) => {
    res.send('Yeet');
});

app.post('/osuTime/backend/gitHook', function (req, res) {
    console.log(req);
    var sender = req.sender;
    var branch = req.ref;

    if(branch == 'refs/heads/master' > -1 && sender.login === 'Michiocre'){
        deploy(res);
    }
});

function deploy(res){
    childProcess.exec('cd /home/web/osuTime && ./deploy.sh', function(err){
        if (err) {
            console.error(err);
            return res.send(500);
        }
        res.send(200);
    });
}

app.listen(config.port, () => {
    console.log('Example app listening on port ' + config.port + '!');
});
