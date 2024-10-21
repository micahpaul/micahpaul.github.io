function removeButton() {
	// todo: get rid of "start" button in HTML body
}

function main() {		
	removeButton();
	let stage = new createjs.Stage('myCanvas');
	let colorGame = new ColorGame('easy', stage);
	colorGame.reset();
}