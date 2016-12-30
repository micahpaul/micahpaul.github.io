var stage = new createjs.Stage('myCanvas');

function drawCircle(color, x, y, radius, onClick){
 var circle = new createjs.Shape();
 circle.graphics.setStrokeStyle(1).beginFill(color).drawCircle(x, y, radius);
 circle.addEventListener("click", onClick);
 stage.addChild(circle);
 stage.update();
}

function correct(){ 
  alert("great job!"); 
}

function incorrect(){ 
  alert("whoops - try again!"); 
}

var radius = 60;
var padding = radius * 1.5;

var colors = ["Red", 
							"DarkOrange", 
              "Yellow", 
              "LimeGreen", 
              "Blue", 
              "Purple", 
              "Black", 
              "White", 
              "HotPink", 
              "SaddleBrown"];

var shuffleColors = colors.slice();

for (i = 0; i < shuffleColors.length; i++) { 
	var x = padding + (i%5 * radius * 2.2);
  var y = ( i < 5 ) ? padding : padding + (radius * 2.1) ;
	drawCircle(shuffleColors[i], x, y, radius, incorrect);    
}
