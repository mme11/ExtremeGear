
var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");


var car= new Image();
var track= new Image();

car.src = "images/car.png";
track.src="images/newtrack.png";


function draw()
{
    ctx.drawImage(track,0,0);
    ctx.drawImage(car,500,40,50,50);
    requestAnimationFrame(draw); 

}

draw();