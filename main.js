
var cvs = document.getElementById('canvas');
var ctx= cvs.getContext("2d");

var xpos = 500;
var ypos =40;
var x ;
var y;
var trackx=-3700;
var tracky=-3700;

var speed = 0;
var angle=0;
var moveAngle=0;

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
       ctx.drawImage(track,-3700,-3700,10900,10900);//10900,10900
        ctx.drawImage(RaceCar,xpos,ypos,50,50);
        requestAnimationFrame(draw);
        //updateRaceArea();
        }
       

    //clears area for the next sprite to be drawn and then assigns values to move angle or speed according to key press. It then calls newpos() and update()
      function updateRaceArea() {        
        ctx.clearRect(xpos,ypos,50,50);
        if(myRaceArea.keys)
        {
            if (myRaceArea.keys[37]) {moveAngle = 1; }
            if (myRaceArea.keys[39]) {moveAngle = -1; }
            if (myRaceArea.keys[38]) {speed= 1; }
            if (myRaceArea.keys[40]) {speed= -1; }
            
        }
        
        newPos();
        update();
    }
           

        //updates position of sprite 
        function newPos(){

           
            angle+= moveAngle * (Math.PI / 180) ;
            x=xpos;
            y=ypos
            xpos += speed * Math.sin(angle);
            ypos -= speed * Math.cos(angle);

            

    
           }
        
      
        //saves current state of canvas and then draws the sprite in the updated position
        function update(){
            ctx.save();
            ctx.translate(xpos,ypos);
            ctx.rotate(angle);
            ctx.drawImage(RaceCar, -15 ,-15 , 50, 50);
    
            ctx.restore(); 
            }

        


    //race= new Cars();
    //race.draw();
    draw();
    //setInterval(draw,100);
   //document.onkeyup= upkey;