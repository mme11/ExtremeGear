<html>
<head>
<style>
//creates canvas where game is to be played
canvas {
    border:1px solid rgb(211,211,211);
    background-color: rgb(241,241,241);
}
</style>
</head>
<body onload="startGame()">

<script>
var RaceCar;
//initial game components
function startGame() {
    RaceCar = new car(30, 50, "blue", 225, 225); //blue block initial values
    myRaceArea.start();
}

var myRaceArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 600;
        this.canvas.height = 360;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateRaceArea, 20);
        //keylisteners for user input
        window.addEventListener('keydown', function (e) {
            e.preventDefault();
            myRaceArea.keys = (myRaceArea.keys || []);
            myRaceArea.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('keyup', function (e) {
            myRaceArea.keys[e.keyCode] = (e.type == "keydown");
        })
    },
    stop : function() {
        clearInterval(this.interval);
    },    
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
//creates block with initial dimensions
function car(width, height, color, x, y, type) {

    this.type = type;
    this.width = width;
    this.height = height;
    this.speed = 0;
    this.angle = 0;
    this.moveAngle = 0;
    this.x = x;
    this.y = y;    
    //updates the block
    this.update = function() {
        ctx = myRaceArea.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = color;
        ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
        ctx.restore();    
    }
    //Movement and speed
    this.newPos = function() {
        this.angle += this.moveAngle * Math.PI / 180;
        this.x += this.speed * Math.sin(this.angle)+this.acceleration-this.friction;
        this.y -= this.speed * Math.cos(this.angle)+this.acceleration-this.friction;
    }
}

// Block moving
function updateRaceArea() {
    myRaceArea.clear();
    RaceCar.acceleration=0.5
    RaceCar.friction=-0.5
    RaceCar.moveAngle = 0;
    RaceCar.speed = 0;
    if (myRaceArea.keys && myRaceArea.keys[37]) {RaceCar.moveAngle = -2; }
    if (myRaceArea.keys && myRaceArea.keys[39]) {RaceCar.moveAngle = 2; }
    if (myRaceArea.keys && myRaceArea.keys[38]) {RaceCar.speed= 3; }
    if (myRaceArea.keys && myRaceArea.keys[40]) {RaceCar.speed= -3; }
    //gives new position of car and updates on canvas
    RaceCar.newPos();
    RaceCar.update();
}
</script>


</body>
</html>
