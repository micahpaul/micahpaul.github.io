# In-Class Assignment 2 April 2025

* Create `index.html` with the following text:

```html
<html>
    <head>
        <title>2-Player Tic Tac Toe</title>
        <style>
            table { font-size: 40px;
                    font-family: 'Courier New', Courier, monospace; }
        </style>
    </head>
    <body>
        <table id="board"></table>
        <p id="currentPlayer">Current Player: X</p>
        <button onclick="init()">New Game</button>
        <script src="tictactoe.js"></script>
    </body>
</html>
```

* In the same directory, create `tictactoe.js` with the following text:

```js
const PLAYER_X = "X";
const PLAYER_O = "O";
const board = document.getElementById("board");
let playerName = PLAYER_X;

function makeColumnHtml(id, marker) {
    return `<td id="${id}" onclick="cellClick(this)">[${marker}]</td>`;
}

function cellClick(cell) {
    cell.innerHTML = makeColumnHtml(cell.id, playerName);
    switchPlayer();
}

function displayPlayerName() {
    document.getElementById("currentPlayer").innerText = "Current Player: " + playerName;
}

function switchPlayer() {
    playerName = (playerName == PLAYER_X) ? PLAYER_O : PLAYER_X;
    displayPlayerName();
}

function init() {
    playerName = PLAYER_X;
    displayPlayerName();
    let boardHtml = "";
    
    for (let ix = 0; ix < 3; ix++) {
        boardHtml += "<tr>";
    
        for (let jx = 0; jx < 3; jx++) {
            boardHtml += makeColumnHtml(`${ix}_${jx}`, "_");
        }
        
        boardHtml += "</tr>";
    }
    
    board.innerHTML = boardHtml;
}

init();
```

* Open `index.html` in a web browser and play around with it. It's ok, but it could be better. Make these improvements (work with classmates if you're stuck):
- Don't allow a player to click on a square that's already taken.
- When someone wins, show an alert to tell them they've won.
- After the game is over, disable any further changes to the tic-tac-toe board.
- Anything else you want to (sounds, images, nicer design, 1-player vs. computer, etc.)

**Hint**: you might find it useful to store the cells in an array of arrays, like we did in the breakout game. Here's a code snippet of that: 

```js
const bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = {x: 0, y: 0, status: 1};
    }
}
```

* Create a repository in GitHub and save both of these files to it.

* Email your repository link to me (don't worry if you didn't have time to complete all the improvements).