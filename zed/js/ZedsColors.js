var RADIUS = 60;
var PADDING = RADIUS * 1.5;
var NUM_PLAY_COLORS = 3;
var colors = [];
var playColors = [];
var theColor;
var stage = new createjs.Stage('myCanvas');
createjs.Touch.enable(stage);
var sayTouchThe = new Audio("sounds/touchthe.mp3");
sayTouchThe.onended = sayTheColor;
var sayCircle = new Audio("sounds/circle.mp3");
var sayGreatJob = new Audio("sounds/greatjob.mp3");
sayGreatJob.onended = reset;
var sayTryAgain = new Audio("sounds/tryagain.mp3"); 
sayTryAgain.onended = function(){sayTouchThe.play();};

function ColorObject (color) {
	this.color = color;
	this.sound = new Audio("sounds/" + color + ".mp3");
	this.sound.onended = function(){sayCircle.play();};
}

function success(){
	sayGreatJob.play();
}

function failure(){
	sayTryAgain.play();
}

function drawCircle(color, x, y, onClick){
 var circle = new createjs.Shape();
 circle.graphics.setStrokeStyle(1).beginFill(color).drawCircle(x, y, RADIUS);
 circle.addEventListener("click", onClick);
 stage.addChild(circle);
 stage.update();
}

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

function pickPlayColors() {
	playColors.length = 0;
	while (playColors.length < NUM_PLAY_COLORS) {
		var color = colors[randomIntFromInterval(0,colors.length-1)];
		if (playColors.indexOf(color) == -1) {
			playColors.push(color);
		}
	}
	
	theColor = playColors[randomIntFromInterval(0,playColors.length-1)];
}

function reset() {
	stage.clear();
	pickPlayColors();
	
	for (i = 0; i < playColors.length; i++) { 
		var thisColor = playColors[i];
		var x = PADDING + (i * RADIUS * 3);
		var y = PADDING;
		var onClick = (thisColor == theColor) ? success : failure;
		drawCircle(thisColor.color, x, y, onClick);			
	}
	
	sayTouchThe.play();
}

function sayTheColor() {
	theColor.sound.play();
}

function main() {
	//var welcome = new Audio("sounds/welcome.mp3");
	//welcome.onended = reset;
	//welcome.play();
	reset();
}

colors.push(new ColorObject("red")); 
colors.push(new ColorObject("darkorange")); 
colors.push(new ColorObject("yellow")); 
colors.push(new ColorObject("limegreen")); 
colors.push(new ColorObject("blue")); 
colors.push(new ColorObject("purple")); 
colors.push(new ColorObject("black")); 
colors.push(new ColorObject("white")); 
colors.push(new ColorObject("hotpink")); 
colors.push(new ColorObject("saddlebrown"));

main();
