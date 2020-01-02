const http = require("http");
const app = require("./app/app");
http.createServer(app).listen(process.argv[2]||80);
