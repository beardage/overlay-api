"use strict";
exports.__esModule = true;
var express_1 = require("express");
var http = require("http");
var app = express_1["default"]();
var server = http.createServer(app);
var port = 3000;
app.get('/', function (req, res) {
    res.status(200).send("Server running at port " + port);
});
server.listen(port, function () {
    console.log("Server running at port " + port);
});
