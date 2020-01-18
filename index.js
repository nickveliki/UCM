const https = require("https");
const app = require("./app/app");
const fs = require("fs");
const server = https.createServer({
    key: fs.readFileSync("/etc/letsencrypt/live/thern.wtf/privkey.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/live/thern.wtf/fullchain.pem")
},app)
server.listen(process.argv[2]||443);
