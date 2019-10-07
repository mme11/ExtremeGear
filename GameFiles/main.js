var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var car= new Image();
var track= new Image();

car.src="https://opengameart.org/sites/default/files/preview_344.png";
track.src="https://duskfire.files.wordpress.com/2011/08/pyracerz.png";

function Draw()
{
    ctx.drawImage(track,0,0);

}

draw();