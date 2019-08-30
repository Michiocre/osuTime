const childProcess = require('child_process');
childProcess.exec('cd ../ && ./deploy.sh', function(err){
        if (err) {
            console.error(err);
            return res.sendStatus(500);
        }
    });
