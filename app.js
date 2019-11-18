const express = require("express");
const app= express();
const http = require("http").createServer(app);
const io = require("socket.io")(http,{}); 
const mysql = require('mysql');





var isUsernameTaken = function(data){
    return users[data.username];
}


let clients=0;  //number of users
io.sockets.on('connection',function(socket){    //when a connection is made


   


    socket.on('disconnect',function(){
        
    });
});

const db=mysql.createConnection({
    host     :'localhost',
    user     :'root',
    password :'',
    database :'nodemysql'
});

db.connect(function(err){   //connecting to the database
    if(err){
        throw err;
    }
    console.log("MySQL connected");
});

app.get('/createdb',function(req,res){  //command which wa sused to create database
    let sql='create database nodemysql';
    db.query(sql,function(err,result){
        if(err){
            throw err;
        }
    console.log(result);
    res.send('database created');
    });
});

app.get('/createtable',function(req,res){   //command which was used to create table
    let sql='CREATE TABLE webProgTable(id int AUTO_INCREMENT , username varchar(200), password varchar(250),score int, position int, PRIMARY KEY (id))';
    db.query(sql,function(err,result){
        if(err){
            throw err;
        }
    console.log(result);
    res.send('table created');
    });
});

/*app.get('/add1st',function(req,res){
    let post={username:"hello",password:"user1",score:0,position:0};
    let sql='INSERT INTO webprogtable SET ?';
    let query= db.query(sql,post,function(err,result){
        if(err){
            throw err;
        }
    console.log(result);
    res.send('pst1 added');
    });
});

app.get('/add2nd',function(req,res){
    let post={title:"post2" , body:"this is post2"};
    let sql='INSERT INTO webprogtable SET ?';
    let query= db.query(sql,post,function(err,result){
        if(err){
            throw err;
        }
    console.log(result);
    res.send('pst2 added');
    });
});

app.get('/selectall',function(req,res){
    let sql='SELECT * FROM webprogtable';
    db.query(sql,function(err,result){
        if(err){
            throw err;
        }
    console.log(result);
    res.send("all selected");
    });
});

app.get('/select1/:id',function(req,res){
    let sql=`select * from webprogtable where id=${req.params.id}`;
    db.query(sql,function(err,result){
        if(err){
            throw err;
        }
    console.log(result);
    res.send('pst1 sleected');
    });
});

app.get('/update/:id',function(req,res){
    let newT="updated title";
    let sql=`update webprogtable set title='${newT}' where id= ${req.params.id}`;

    let query=db.query(sql,newT,function(err,result){
        if(err){
            throw err;
        }
    console.log(result);
    res.send('pst1 title changed');
    });
});*/

app.use('/client-side',express.static(__dirname+"/client-side"));




app.get("/", function(req, res) {   //directs to the client.html
    res.sendFile(__dirname + "/client-side/client.html");
    });

app.post('/auth', function (req,res) {  //when begin is clicked
    var username= req.param.username;
    var password=req.param.password;
    console.log("hello");
    let post={username:username,password:password,score:0,position:0};
    let sql='INSERT INTO webprogtable SET ?';
    let query= db.query(sql,post,function(err,result){
        if(err){
            throw err;
        }
    console.log(result);
            });
    res.sendFile("C:/Users/Aysha Farheen/Documents/GitHub/furry-sadness/client-side/index.html");//file directing to
                                                                                                //main game
        });




http.listen(2020,function(err)  //puts the server at 2020
{   if(err)
        throw err;
    console.log("Server at 2020");
});





