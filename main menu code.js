//Tracking the location of the mouse
var mouseX = 0;
var mouseY = 0;
var menu = document.getElementById("mainmenu"),
    ctx = mainmenu.getContext("2d");
var startbtn = new Button(616, 1068, 847, 988);
function init(){
    //add this to the initizing function
    drawMenu();
    document.addEventListener('click', mouseClick, false);
}

function startButton() {
     drawBg();
     //'startLoop();'
     // Eventlisteners for movement, ectra.
     // Replace these as required...
}

function drawMenu() {
    ctxBg.drawImage(mainmenu, 0, 0, gameWidth, gameHeight, 0, 0, gameWidth, gameHeight)
}

function Button(xL, xR, yT, yB){
    this.xLeft = xL;
    this.xRight = xR;
    this.yTop = yT;
    this.yBottom = yB;
}

Button.prototype.checkClicked = function(){
    if (this.xLeft <= mouseX && mouseX <= this.xRight && this.yTop <= mouseY && mouseY <= this.yBottom) return true;
}

function mouseClick(e){
 mouseX = e.pageX - canvasBg.offsetLeft;
 mouseY = e.pageY - canvasBg.offsetTop;
 if (startbtn.checkClicked()) startButton();
}