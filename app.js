const express = require("express");
const app= express();
const http = require("http").createServer(app);
const io = require("socket.io")(http,{}); 
const mysql = require('mysql');

var users={
    'hello':'user1',
    'hello2':'user2',
    'hello3':'user3'
}

var isValidPassword = function(data){
    return users[data.username]=== data.password;
}

var isUsernameTaken = function(data){
    return users[data.username];
}

var addUser = function(data){
    users[data.username]=data.password;
}

let clients=0;
io.sockets.on('connection',function(socket){

    socket.on('signIn',function(data){
        if(isValidPassword(data))
        {
            socket.id=Math.random();
            socket_list[socket.id]=socket;
                
            var player = players(socket.id);
            player_list[socket.id]=player;
                
            clients++;

            socket.emit('signInResponse',{success:true});
        }
        else
        {
            socket.emit('signInResponse',{success:false});
        }
          
    });

    socket.on('signUp',function(data){
        if(isUsernameTaken(data)){
            socket.emit('signUpResponse',{success:false});
        }
        else{
            addUser(data);
            socket.emit('signUpResponse',{success:true});
        }
    });

    socket.on('disconnect',function(){
        delete socket_list[socket.id];
        delete player_list[socket.id];
    });
});

const db=mysql.createConnection({
    host     :'localhost',
    user     :'root',
    password :'',
    database :'nodemysql'
});

db.connect(function(err){
    if(err){
        throw err;
    }
    console.log("MySQL connected");
});

app.get('/createdb',function(req,res){
    let sql='create database nodemysql';
    db.query(sql,function(err,result){
        if(err){
            throw err;
        }
    console.log(result);
    res.send('database created');
    });
});

app.get('/createtable',function(req,res){
    let sql='CREATE TABLE webProgTable(id int AUTO_INCREMENT , username varchar(200), password varchar(250),score int, position int, PRIMARY KEY (id))';
    db.query(sql,function(err,result){
        if(err){
            throw err;
        }
    console.log(result);
    res.send('table created');
    });
});

app.get('/add1st',function(req,res){
    let post={title:"post1" , body:"this is post1"};
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
});

app.use('/client-side',express.static(__dirname+"/client-side"));

var socket_list = {}; 
var player_list={};


app.get("/", function(req, res) {
    res.sendFile(__dirname + "/client-side/client.html");
    console.log(__dirname + "/client-side/client.html");
    });



var players=function(id){
    var self={
        x:250,
        y:250,
        id:id,
        number:" "+Math.floor(10*Math.random())

    }
    return self;
}


http.listen(2020,function()
{   console.log("Server at 2020");
});

setInterval(function(){
    var pack=[];
    for (var i in player_list){
        var player=player_list[i];
        player.x++;
        player.y++;
        pack.push({
            x:player.x,
            y:player.y,
            number:player.number
        });
       }
       for(var i in socket_list){
            var player=socket_list[i];
            player.emit('newPositions',pack);
       }



},1000/25); 