var score= $("#score");
var score_counter=1;
var cvs = document.getElementById('canvas');
var ctx= cvs.getContext("2d");

cvs.width = window.innerWidth;
cvs.height = window.innerHeight;
var xpos = 500;
var ypos =40;
var boundary=40;
var final=0;
var socket=io();
var cameraspeed=0;

var dest_width,dest_height;

var dx = 2;
var dy = -2;
var barx = cvs.width/2;
var  bary= cvs.height-30;
var speed = 0;
var angle=0;
var moveAngle=0;

room_xview =-3700 ;//-3700 -3550    -3490     -3650  
room_yview = -3700;//-3700  -3100       
room_sizex = 10900; 
room_sizey = 10900; 
room_width = 9189;  
room_height = 5382;
carsize=30;

var RaceCar= new Image();
var track= new Image();

RaceCar.src = "client-side/images/Blue Tank 3.png";

track.src="client-side/images/newtrack.png";

    function startGame()     //function that is first called [<body onload = "startGame()">]
    {   
        socket.on('start',function(username){
            var username=username;
        });
        Race.start();
    }   

    var Race = { 

    start:function()       //contains EVENT HANDLERS    
    {
        this.interval = setInterval(updateArea, 20);
        document.addEventListener('keydown', function(e) {
            e.preventDefault();
            Race.keys = (Race.keys || []);
            Race.keys[e.keyCode] = (e.type == "keydown");
        })
        document.addEventListener('keyup', function (e) {
            Race.keys[e.keyCode] = (e.type == "keydown");
            speed=0;
            cameraspeed=0;
            moveAngle=0;
            
        })
    },

   
}

       

function draw(){        //draws racetrack and car
    check();
   ctx.drawImage(track,room_xview,room_yview,room_sizex,room_sizey);//10900,10900
    ctx.drawImage(RaceCar,xpos,ypos,carsize,carsize);
    requestAnimationFrame(draw);
    //updateRaceArea();
    }       


    //clears area for the next sprite to be drawn and then assigns values to move angle or speed according to key press. It then calls newpos() and update()
      function updateArea() {        
        ctx.clearRect(xpos,ypos,50,50);

        if(Race.keys)
        {   
            
            if (Race.keys[37]) 
                {moveAngle = 2; 
                updateScore();}
            if (Race.keys[39]) 
                {moveAngle = -2;
                updateScore(); }
            if (Race.keys[40]) 
                {cameraspeed= 10
                updateScore();
                speed= 5; }
            if (Race.keys[38])
                 {cameraspeed= -10;
                 updateScore();
                 speed= -5; }
            
        }
        
        newPos();
        update();
    }
           

        
        // Checks the center of the map for boundaries
        
        function check()
        {
            var colordata = ctx.getcolordata(xpos,ypos,1,1)
            var hex = "#" + ("000000" + rgbToHex(colordata[0], colordata[1], colordata[2])).slice(-6);
            if ( colordata[0], colordata[1], colordata[2] == 15 , 189 , 52) {
                return false
            }
            else {
                updateRaceArea()
            }
        }
        //updates position of sprite 
        function newPos()
        {
            angle+= moveAngle * (Math.PI / 180) ;
            xpos += speed * Math.sin(angle);
            ypos -= speed * Math.cos(angle);
            room_xview-= cameraspeed* Math.sin(angle);
            room_yview+=cameraspeed* Math.cos(angle);

            
            
            if (xpos < 500 || xpos > 500) 
                xpos = 500; //500 is the starting point of the car 
        
            if (ypos< 40) 
                ypos= 40;//40 is the starting ypos of the car

                if(ypos > 500 || ypos < 500)
                ypos = 200;
        
            if (xpos > room_width-500) 
                xpos = room_width-500;
        
            if (ypos > room_height-40) 
                ypos = room_height-40;
            
            if(room_xview<-3490 && room_xview>-3650 && room_yview<-3100){
                gameover();
            }
            


        }
        
      
        //moves the camera to move the car around the track
        function update(){
            
            dest_width=room_width;
            dest_height=room_height;
            
            ctx.drawImage(track,room_xview,room_yview,room_sizex,room_sizey);
            
            ctx.save();
        
            ctx.translate(xpos,ypos);
            ctx.rotate(angle);
            
            ctx.drawImage(RaceCar, -15 , -15 , carsize, carsize);
            
            ctx.restore(); 
            
            }

            function updateScore(){//updates the score with the movement of the car
                score_counter++;
                if(score_counter%15==0){
                    score.text(parseInt(score.text())+1)
                    final++;
            } 
        }



                function gameover(){
                    socket.emit('score',final,username);
                }
