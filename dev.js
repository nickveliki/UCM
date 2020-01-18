const http = require("http");
const app = require("./app/app");
const fs = require("fs");
const server = http.createServer(app);
server.listen(process.argv[2]);