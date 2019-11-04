
var cvs = document.getElementById('canvas');
var ctx= cvs.getContext("2d");

cvs.width = window.innerWidth;
cvs.height = window.innerHeight;
var xpos = 500;
var ypos =40;
var boundary=40;

var cameraspeed=0;
//var boundary_up=ypos+20;
var dest_width,dest_height;
//var trackx=-3700;
//var tracky=-3700;
var dx = 2;
var dy = -2;
var barx = cvs.width/2;
var  bary= cvs.height-30;
var speed = 0;
var angle=0;
var moveAngle=0;

room_xview = -3700; 
room_yview = -3700;  
room_sizex = 10900; 
room_sizey = 10900; 
room_width = 9189;  
room_height = 5382;
carsize=30;

var RaceCar= new Image();
var track= new Image();

RaceCar.src = "images/Blue Tank 3.png";

track.src="images/newtrack.png";

    function startGame()     //function that is first called [<body onload = "startGame()">]
    {   
        myRaceArea.start();
    }   

    var myRaceArea = { 

    start:function()       //contains EVENT HANDLERS    
    {
        this.interval = setInterval(updateRaceArea, 20);
        document.addEventListener('keydown', function(e) {
            e.preventDefault();
            myRaceArea.keys = (myRaceArea.keys || []);
            myRaceArea.keys[e.keyCode] = (e.type == "keydown");
        })
        document.addEventListener('keyup', function (e) {
            myRaceArea.keys[e.keyCode] = (e.type == "keydown");
            speed=0;
            cameraspeed=0;
            moveAngle=0;
        })
    },

    stop : function() {
        clearInterval(this.interval);
    }
   
}

/*class Cars
{
    constructor()
    {
    this.speed=speed;
    this.moveAngle=moveAngle;
    this.width=50;
    this.height=50;
    this.x=xpos;
    this.y=ypos;
    this.angle=angle;
    }

    draw(){        //draws racetrack and car
        this.updateRaceArea();
       ctx.drawImage(track,-3700,-3700,10900,10900);
        ctx.drawImage(RaceCar,this.x,this.y,this.width,this.height);
        requestAnimationFrame(this.draw);
        }


        //clears area for the next sprite to be drawn and then assigns values to move angle or speed according to key press. It then calls newpos() and update()
        updateRaceArea() {        
            ctx.clearRect(this.x,this.y,this.width,this.height);
            if(myRaceArea.keys)
            {
                if (myRaceArea.keys[37]) {this.moveAngle = 1; }
                if (myRaceArea.keys[39]) {this.moveAngle = -1; }
                if (myRaceArea.keys[38]) {this.speed= 1; }
                if (myRaceArea.keys[40]) {this.speed= -1; }
            }
            
            newPos();
            update();
        }


         //updates position of sprite 
         newPos(){

           
            this.angle += this.moveAngle * (Math.PI / 180) ;
          
            this.x += this.speed * Math.sin(this.angle);
            this.y -= this.speed * Math.cos(this.angle);

    
           }
        
      
        //saves current state of canvas and then draws the sprite in the updated position
        update(){
            ctx.save();
            ctx.translate(this.x,this.y);
            ctx.rotate(this.angle);
            ctx.drawImage(RaceCar, this.width/-2 , this.height/-2 , this.width, this.width);
    
            ctx.restore(); 
            }
    
}*/



     function draw(){        //draws racetrack and car
        updateRaceArea();
       ctx.drawImage(track,room_xview,room_yview,room_sizex,room_sizey);//10900,10900
        ctx.drawImage(RaceCar,xpos,ypos,carsize,carsize);
        requestAnimationFrame(draw);
        //updateRaceArea();
        }
       

    //clears area for the next sprite to be drawn and then assigns values to move angle or speed according to key press. It then calls newpos() and update()
      function updateRaceArea() {        
        ctx.clearRect(xpos,ypos,50,50);

        if(myRaceArea.keys)
        {
            if (myRaceArea.keys[37]) {moveAngle = 2; }
            if (myRaceArea.keys[39]) {moveAngle = -2; }
            if (myRaceArea.keys[38]) 
                {cameraspeed=4;
                speed= 2; }
            if (myRaceArea.keys[40])
                 {cameraspeed=-4;
                 speed= -2; }
            
        }
        
        newPos();
        update();
    }
           

        //updates position of sprite 
        function newPos()
        {
            angle+= moveAngle * (Math.PI / 180) ;
            xpos += speed * Math.sin(angle);
            ypos -= speed * Math.cos(angle);
            room_xview-= cameraspeed* Math.sin(angle);
            room_yview+=cameraspeed* Math.cos(angle);
            
            if (xpos < 500) 
                xpos =500; //500 is the starting point of the car 
        
            if (ypos< boundary) 
                ypos= boundary;//40 is the starting ypos of the car

            if(ypos>300)
                ypos=300;
        
            if (xpos > room_width-500) 
                xpos = room_width-500;
        
            if (ypos > room_height-40) 
                ypos = room_height-40;


            //xpos=xpos-room_xview/2;
            //ypos=ypos-room_yview/2;

        }
        
      
        //saves current state of canvas and then draws the sprite in the updated position
        function update(){
            dest_width=room_width;
            dest_height=room_height;
            //ctx.drawImage(track,room_xview,room_yview,room_width,room_height,dest_xview,dest_yview,dest_width,dest_height);
            ctx.drawImage(track,room_xview,room_yview,room_sizex,room_sizey);
            
            ctx.save();
            //ctx.translate(xpos - cvs.width / 2, ypos - cvs.height / 2);
            ctx.translate(xpos,ypos);
            ctx.rotate(angle);
            //ctx.drawImage(track,-3700,-3700,10900,10900);
            ctx.drawImage(RaceCar, -15 , -15 , carsize, carsize);
            
            ctx.restore(); 
            
            }

            /*function update(){
                dest_width=room_width;
                dest_height=room_height;
    
                if (xpos < 500) 
                    xpos = 500; //500 is the starting point of the car 
                
                if (ypos< 40) 
                    ypos = 40;//40 is the starting ypos of the car
                
                if (xpos > room_width-500) 
                    xpos = room_width-500;
                
                if (ypos > room_height-40) 
                    ypos = room_height-40;
    
                //ctx.drawImage(track,room_xview,room_yview,room_width,room_height,dest_xview,dest_yview,dest_width,dest_height);
                ctx.drawImage(track,room_xview,room_yview,10900,10900);
                ctx.save();
                ctx.translate(xpos,ypos);
                ctx.rotate(angle);
                ctx.drawImage(RaceCar, -15 , -15 , 50, 50);
               
                ctx.restore(); 
                }*/