const COLORS = [
 "red"
,"darkorange"
,"yellow"
,"limegreen"
,"blue"
,"purple"
,"black"
,"white"
,"hotpink"
,"saddlebrown"];

let theColor = "red";
let currentScore = 0;
let playColors = [];
let xDivs = [];
let yDivs = [];
const NUM_PLAY_COLORS = 4;

function clickPiece(color) {
    let extraText;

    if (color === theColor){
        currentScore++;
        extraText = "good job!";
        updateColors();
    }
    else {
        currentScore--;
        extraText = "nope, not " + color + "!";
    }

    updateDashboard(extraText);
}

function updateDashboard(extraText="") {
    const dashboard = document.getElementById("dashboard");
	dashboard.innerText = extraText + "\nThe color is " + theColor + 
        "\nCurrent score: " + currentScore;
}

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

// clear out playColors, pick new ones at random, and select one right one  
function pickPlayColors() {
	playColors.length = 0;

	while (playColors.length < NUM_PLAY_COLORS) {
		var color = COLORS[randomIntFromInterval(0,COLORS.length-1)];
		if (playColors.indexOf(color) == -1) {
			playColors.push(color);
		}
	}
	
	theColor = playColors[randomIntFromInterval(0,playColors.length-1)];
}

function adjustseconds(secondsText, factor) {
    let result = secondsText.substring(0,secondsText.length-1);
    result *= factor;
    return result + 's';
}

function updateColors() {
    pickPlayColors();

    updateDashboard();
    
    for (let ix = 0; ix < yDivs.length; ix++) {
        yDivs[ix].style.backgroundColor=playColors[ix];
        yDivs[ix].onclick = () => {clickPiece(playColors[ix])}
        yDivs[ix].ontouchstart = () => {clickPiece(playColors[ix])}
        xDivs[ix].style.animationDuration = adjustseconds(xDivs[ix].style.animationDuration, .9);
        yDivs[ix].style.animationDuration = adjustseconds(yDivs[ix].style.animationDuration, .9);
    }  
}

function createGamePieces() {
    pickPlayColors();

    updateDashboard();
    
    const gameDiv = document.getElementById("game"); 

    gameDiv.innerHTML = "";

    for (let ix = 0; ix < playColors.length; ix++) {    
        const xDiv = document.createElement("div");
        xDiv.className = "el-wrap x";
        xDiv.style.animationDuration = (1 + Math.random()) * 3 + 's';
                
        const yDiv = document.createElement("div");
        yDiv.className = "el y";
        yDiv.style.backgroundColor=playColors[ix];
        yDiv.style.animationDuration = (1 + Math.random()) * 3 + 's';
        yDiv.onclick = () => {clickPiece(playColors[ix])}
        yDiv.ontouchstart = () => {clickPiece(playColors[ix])}

        yDivs.push(yDiv);
        xDivs.push(xDiv);

        xDiv.appendChild(yDiv);
        
        gameDiv.appendChild(xDiv);
    }
}

function main() {
    const mainButton = document.getElementById("mainButton");
	mainButton.parentNode.removeChild(mainButton);

    createGamePieces();    

    const gameSound = new Audio("ColorGame-Background.m4a");
    gameSound.loop = true;
    gameSound.play();

    console.log(document.body);

    // todo: different starting positions for each item
    // todo: don't re-create objects every time
    // todo: sounds: jukebox?
    // todo: visual themes / color schemes
    // todo: increasing difficulty
    // todo: touch multiple colors to get a mixed one?
    // todo: different shapes
    // todo: make dashboard pretty
    // todo: doesn't work on iPhone > Chrome
}
