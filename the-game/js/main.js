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
const NUM_PLAY_COLORS = 4;

function clickPiece(color) {
    let extraText;

    if (color === theColor){
        currentScore++;
        extraText = "good job!";
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

function main() {
    const mainButton = document.getElementById("mainButton");
	mainButton.parentNode.removeChild(mainButton);

    pickPlayColors();

    updateDashboard();
    
    const gameDiv = document.getElementById("game"); 

    for (let ix = 0; ix < playColors.length; ix++) {    
        const xDiv = document.createElement("div");
        xDiv.className = "el-wrap x";
        xDiv.style.animationDuration = randomIntFromInterval(3,6) + 's';
                
        const yDiv = document.createElement("div");
        yDiv.className = "el y";
        yDiv.style.backgroundColor=playColors[ix];
        yDiv.style.animationDuration = randomIntFromInterval(3,6) + 's';
        yDiv.onclick = () => {clickPiece(playColors[ix])}
        
        xDiv.appendChild(yDiv);
        
        gameDiv.appendChild(xDiv);
    }

    const gameSound = new Audio("ColorGame-Background.m4a");
    gameSound.loop = true;
    gameSound.play();

    console.log(document.body);

    // todo: make play area smaller so they're always on screen
    // todo: different x vel, y vel, starting positions for each item
    // todo: sounds: jukebox?
    // todo: visual themes / color schemes
    // todo: speed up, slow down
    // todo: touch multiple colors to get a mixed one?
    // todo: different shapes
    // todo: make dashboard pretty          
}
