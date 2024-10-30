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

function main() {
    const mainButton = document.getElementById("mainButton");
	mainButton.parentNode.removeChild(mainButton);

    const gameDiv = document.createElement("div");
    gameDiv.className = "colorGame";
    document.body.appendChild(gameDiv);

    updateDashboard();
    
    for (let ix = 0; ix < COLORS.length; ix++) {
        const pieceDiv = document.createElement("div");
        pieceDiv.className = "gamePiece";
        pieceDiv.style.backgroundColor=COLORS[ix];
        pieceDiv.style.left = ix * 12 + "%";
        pieceDiv.onclick = () => {clickPiece(COLORS[ix])}
        gameDiv.appendChild(pieceDiv);
    }
   
    // const pieces = document.getElementsByClassName("gamePiece");
    
    // for (let i = 0; i < pieces.length; i++) {
    //     pieces[i].style.backgroundColor='orange';
    //     pieces[i].onclick = () => {alert("hi mom")};

    //     // todo: pick one as "the" color
    //     // todo: onClick events
    //     // todo: sounds
    //     // todo: scores
            // todo: speed up, slow down
            // todo: better pattern, bigger circles
            // todo: mix colors?
    // }
}
