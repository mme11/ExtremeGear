
var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");


var car= new Image();
var track= new Image();

car.src = "images/car.png";
aysha
track.src="images/newtrack.png";

track.src="images/track.png"
master


function draw()
{

    ctx.drawImage(track,-3700,-3700,10900,10900);

aysha
    ctx.drawImage(track,0,0);

    ctx.drawImage(car,500,40,50,50);

    ctx.drawImage(track,0,0); 

    requestAnimationFrame(draw); 

}

draw();