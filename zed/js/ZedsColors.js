var RADIUS = 60;
var PADDING = RADIUS * 1.5;
var NUM_PLAY_COLORS = 3;
var colors = [];
var playColors = [];
var circles = [];
var theColor;
var stage = new createjs.Stage('myCanvas');
createjs.Touch.enable(stage);

var welcomeSound = makeSound("wild_welcome");
var touchTheSound = makeSound("wild_touch_the");
var circleSound = makeSound("circle");
var greatJobSound = makeSound("greatjob");
var tryAgainSound = makeSound("tryagain");

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

// assumption: in sounds folder with .mp3 extension
function makeSound(baseName) {
	return new Audio("sounds/"+ baseName + ".mp3");
}

// make a sound and attach "... circle" to the end
function makeColorSound(colorName) {
	let sound = makeSound(colorName);
	sound.addEventListener('ended',function(e){
		circleSound.play();
	});

	return sound;
}

// this probably should be a class at some point...
function ColorObject (color) {
	this.color = color;
	this.sound = makeColorSound(color);
}

// disable clicks and say great job! clicks will be re-enabled next time we tell the color. 
function success(){
	enableClicks(false);	
	greatJobSound.play();
}

// disable clicks and say try again. clicks will be re-enabled next time we tell the color.
function failure(){
	enableClicks(false);
	tryAgainSound.play();
}

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

// clear out playColors, pick new ones at random, and select one right one  
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

function drawCircle(color, x, y, onClick){
	var circle = new createjs.Shape();
	circle.graphics.setStrokeStyle(1).beginFill(color).drawCircle(x, y, RADIUS);
	circle.addEventListener("click", onClick);
	circle.mouseEnabled = false;
	stage.addChild(circle);
	stage.update();
	
	return circle;
}

function drawCircles() {
	circles.length = 0;
	
	for (i = 0; i < playColors.length; i++) { 
		var thisColor = playColors[i];
		var x = PADDING + (i * RADIUS * 3);
		var y = PADDING;
		var onClick = (thisColor == theColor) ? success : failure;
		circles.push(drawCircle(thisColor.color, x, y, onClick));			
	}
}

function enableClicks(enabled) {
	for (i=0; i < circles.length; i++) {
		circles[i].mouseEnabled = enabled;
	}
}

function reset() {
	stage.clear();

	pickPlayColors();
	
	drawCircles();

	// now that we have a new color, chain it to the end of "touch the..."
	touchTheSound.addEventListener('ended',function(e){
		theColor.sound.play();
	});

	touchTheSound.play();
}

function addEventListeners() {
	// when trying again, go back to "touch the..."
	tryAgainSound.addEventListener('ended',function(e){
		touchTheSound.play();
	});

	// keep the circles disabled until done saying "...circle"
	circleSound.addEventListener('ended',function(e){
		enableClicks(true);
	});

	// after "that's the right color," restart with new colors
	greatJobSound.addEventListener('ended',function(e){
		reset();
	});	

	// once the welcome is done, remove the button and start!
	welcomeSound.addEventListener('ended',function(e){
		var element = document.getElementById("main-button");
		element.parentNode.removeChild(element);

		reset();
	});
}

function main() {		
	addEventListeners();	
	welcomeSound.play();
}