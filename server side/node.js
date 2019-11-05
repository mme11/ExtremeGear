const express = require("express");
const app= express();
const http = require("http").createServer(app);
const io = require("socket.io")(http); 
const mysql = require('mysql');

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/client side/client.html");
    });

app.use('/client side',express.static(__dirname+'/client side'));

http.listen(3000,function()
{   console.log("Server at 3000");
});

