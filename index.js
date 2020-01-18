const http2 = require("http2");
const app = require("./app/app");
http2.createServer({
    key: fs.readFileSync("/etc/letsencrypt/live/thern.wtf/privkey.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/live/thern.wtf/fullchain.pem")
},app).listen(process.argv[2]||80);
