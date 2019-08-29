# osuTime

Web application used to determine the average time of the day for the top 100 [osu!](https://osu.ppy.sh/home) plays a player has.

# Project Description:

I wanted to calculate at what time of day i set my highest scores in osu! so i could find out if there is a correlation between pp and time. The frontend takes the given username and forwards it to the backend where the top 100 plays are pulled from the osu! API. The frontend then takes these plays sorts them and calculates an average that is displayed using canvas.js.

## For developer

After downloading you can run
`npm run install-all`
to install all the packages for both back- and frontend.
This will also install a git-hook that will run `npm test` on commit.


Then go into the `server/config` folder copy `config.json.template` and remove the .template extension.
Enter your osu! API Key [here](https://osu.ppy.sh/p/api).
Enter the port you want your backend to run on.

Then go into the `client/config` folder copy `config.json.template` and remove the .template extension.
Change the url to match where your backend is running, but keep the /backend part of the url.

Test with:
`npm test`

Start development mode:
`npm start`

Build with:
`npm run build`
This will build the frontend react app and start the backend using pm2.
If you dont already have a webserver running you can start the frontend with:
`npm run serve`

Other scripts:
`npm run client`        - starts the frontend using react
`npm run server`        - starts the backend using nodemon
`npm run client-build`  - builds the frontend
`npm run server-build`  - starts the backend using pm2
