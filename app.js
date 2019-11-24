const express = require("express");
const app= express();
const http = require("http").createServer(app);
const io = require("socket.io")(http,{}); 
const mysql = require('mysql');
const dataparser=require('body-parser');
const urlencodedParser = dataparser();



let clients=0;  //number of users
io.sockets.on('connection',function(socket){    //when a connection is made
socket.id=Math.random();

console.log("connected")
   socket.on('score',function(score,username){
    connection.query("UPDATE webProgTable SET SCORE=" + score + "WHERE USERNAME=" + username+ ";",function(err,result){
        if(err){
            console.log(err);
        }
        else
            console.log(result);
    });
   });

   

});

const connection=mysql.createConnection({
    host     :'localhost',
    user     :'root',
    password :'',
    database :'users'
});

connection.connect(function(err){   //connecting to the database
    if(err){
        throw err;
    }
    console.log("MySQL connected");     
});

app.get('/createdb',function(req,res){  //command which wa sused to create database
    let sql='create database users';
    connection.query(sql,function(err,result){
        if(err){
            throw err;
        }
    console.log(result);
    res.send('database created');
    });
});

app.get('/createtable',function(req,res){   //command which was used to create table
    let sql='CREATE TABLE webProgTable(id int AUTO_INCREMENT , username varchar(200) NOT NULL, password varchar(250) NOT NULL,score int NOT NULL, position int NOT NULL, PRIMARY KEY (id))';
    connection.query(sql,function(err,result){
        if(err){
            throw err;
        }
    console.log(result);
    res.send('table created');
    });
});


app.use('/client-side',express.static(__dirname+"/client-side"));




app.get("/", function(req, res) {   //directs to the client.html
    res.sendFile(__dirname + "/client-side/client.html");
    });

app.post('/auth',urlencodedParser, function (req,res) {  //when begin is clicked
    var username= req.body.username;
    var password=req.body.password;
    clients++;
    console.log(username);
    let post={username:username,password:password,score:0,position:0,clients:clients};
    let sql='INSERT INTO webprogtable SET ?';
    let query= connection.query(sql,post,function(err,result){
        if(err){
            throw err;
        }
    
    console.log(result);
    console.log(clients)
            });
    res.sendFile("C:/Users/Aysha Farheen/Documents/GitHub/furry-sadness/client-side/index.html");//file directing to
                                                                                                 //main game
        });




http.listen(2020,function(err)  //puts the server at 2020
{   if(err)
        throw err;
    console.log("Server at 2020");
});

module.exports = connection;


