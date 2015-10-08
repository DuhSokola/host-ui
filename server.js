#!/bin/env node
//  OpenShift sample Node application
var http = require('http');
// Scope
var server = {};
var express = require('express');

server.app = (function() {
    return express();
}());

//Get the environment variables we need.
var ipaddr  = "localhost";
var port    =  9000;

server.app.use(express.static(process.cwd()));

http.createServer(server.app).listen(port, ipaddr);

console.log("Server running at http://" + ipaddr + ":" + port + "/");