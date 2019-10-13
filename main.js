
var cvs = document.getElementById('canvas');
var ctx = cvs.getContext("2d");
var xpos = 500;   
var ypos =40;

var car= new Image();
var track= new Image();

car.src = "images/car.png";

track.src="images/newtrack.png";





function draw()
{   
    ctx.drawImage(track,-3700,-3700,10900,10900);
    ctx.drawImage(car,xpos,ypos,50,50);


 requestAnimationFrame(draw); 

}
draw();



function move(e)
{

    if (e.keyCode ==39){
    xpos+=5;
    }
    if(e.keyCode == 37){
    xpos-=5;
    }
    if(e.keyCode == 38){
    ypos-=5;
    }
    if(e.keyCode == 40){
    ypos+=5;
    }

}



document.onkeydown = move;  