var RADIUS = 60;
var PADDING = RADIUS * 1.5;
var NUM_PLAY_COLORS = 3;
var colors = [];
var playColors = [];
var theColor;
var stage = new createjs.Stage('myCanvas');
createjs.Touch.enable(stage);

var welcomeSound = makeSound("wild_welcome");
var greatJobSound = makeSound("greatjob");
var tryAgainSound = makeSound("tryagain");
var iLoveZed = makeSound("i_love_zed");

function makeSound(baseName) {
	return new Audio("sounds/"+ baseName + ".mp3");
}

function ColorObject (color) {
	this.color = color;
	this.sound = makeSound(color);
	this.sound.addEventListener('ended',function(e){
		iLoveZed.play();
	});
}

function success(){
	greatJobSound.play();
	reset();
	theColor.sound.play();
}

function failure(){
	tryAgainSound.play();
	theColor.sound.play();
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
}

function main() {	
	var element = document.getElementById("main-button");
	element.parentNode.removeChild(element);
	welcomeSound.play();
	reset();
	theColor.sound.play();
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
