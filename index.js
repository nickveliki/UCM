const https = require("http2");
const app = require("./app/app");
const fs = require("fs");
https.createServer({
    key: fs.readFileSync("/etc/letsencrypt/live/thern.wtf/privkey.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/live/thern.wtf/fullchain.pem")
},app).listen(process.argv[2]||443);
