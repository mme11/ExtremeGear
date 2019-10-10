
var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");


var car= new Image();
var track= new Image();

car.src = "images/car.png";
track.src="images/track.png"


function draw()
{
    ctx.drawImage(track,0,0); 
    requestAnimationFrame(draw); 

}

draw();