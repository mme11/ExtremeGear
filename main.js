
var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");


var car= new Image();
var track= new Image();

car.src = "images/car.png";
track.src="images/newtrack.png";


function draw()
{
    ctx.drawImage(track,-3700,-3700,10900,10900);
    ctx.drawImage(car,500,40,50,50);
    requestAnimationFrame(draw); 

}

draw();