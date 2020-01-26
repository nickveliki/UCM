const https = require("https");
const app = require("./app/app");
const fs = require("fs");
const webpush = require('web-push');
if (!fs.existsSync('./htdocs/vapidpublic')&&!fs.existsSync('./.vapidprivate')){
    console.log("generating VAPID key files")
    const {publicKey, privateKey} = webpush.generateVAPIDKeys();
    fs.writeFileSync('./htdocs/vapidpublic', publicKey);
    fs.writeFileSync('./.vapidprivate', privateKey);
}
webpush.setVapidDetails('mailto:example@mydomain.com', fs.readFileSync('./htdocs/vapidpublic').toString(), fs.readFileSync('./.vapidprivate').toString())
const server = https.createServer({
    key: fs.readFileSync("/etc/letsencrypt/live/thern.wtf/privkey.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/live/thern.wtf/fullchain.pem")
},app)
server.listen(443);
