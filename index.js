const http = require("http");
const app = require("./app/app");
http.createServer(app).listen(80);
