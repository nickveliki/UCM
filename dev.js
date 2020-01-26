const http = require("http");
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
const server = http.createServer(app);
server.listen(process.argv[2]);