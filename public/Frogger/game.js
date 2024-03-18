// game.js for Perlenspiel 3.1.1
// Perlenspiel is a scheme by Professor Moriarty (bmoriarty@wpi.edu).
// Perlenspiel is Copyright © 2009-14 Worcester Polytechnic Institute.
// This file is part of Perlenspiel.

//     Project Title:	Frogger
//            Author:	Timothy Hatch
//              Date:	04/30/14

var GAME = {

	w : 11,
	h : 20,

	clock : 15,
	gridBackgroundColor : 0x336699,
	running : true,
	ticking : false,
};

var PLAYER = {

	numPrizesLeft : 0,
	numLivesLeft  : 0,
	startY : GAME.h - 3,

	x : 0,
	y : 0,

}

var monX   = new Array ();
var monY   = new Array ();
var monDir = new Array ();

function EraseBead (x, y) {

	PS.data (x, y, 0);
	PS.color (x, y, 0x9C762E);
	PS.glyph (x, y, 0);
	PS.glyphScale (x, y, 100);
	PS.border (x, y, 0);

}

function DrawPawn (x, y) {

	PS.data (x, y, "pawn");
	PS.glyphColor (x, y, 0x545454);
	PS.glyphScale (x, y, 75);
	PS.glyph (x, y, 0x0d08);

}

//function DrawButtons () {
//
//	PS.data (1, 1, "Move Right");
//	PS.data (0, PS.ALL, "Move Left");
//	PS.data (PS.ALL, GAME.h - 1, "Move Up");
//	PS.data (PS.ALL, 0, "Move Down");
//}

function DrawPlayingField () {

	PS.gridColor (GAME.gridBackgroundColor);

	EraseBead (PS.ALL, PS.ALL);

	DrawButtons (0, PS.ALL, "Move Left");
	DrawButtons (GAME.w - 1, PS.ALL, "Move Right");
	DrawButtons (PS.ALL, GAME.h - 1, "Move Down");
	DrawButtons (PS.ALL, 0, "Move Up");

	DrawWall (1, PS.ALL);
	DrawWall (GAME.w - 2, PS.ALL);
	DrawWall (PS.ALL, GAME.h - 2);
	DrawWall (PS.ALL, 1);

	SpawnMonster (2,  3,  1);
	SpawnMonster (3,  4, -1);
	SpawnMonster (4,  6,  1);
	SpawnMonster (6,  8, -1);
	SpawnMonster (4, 10, -1);
	SpawnMonster (5, 11,  1);
	SpawnMonster (7, 13, -1);

	for (var x = 2; x < GAME.w - 2; x++) {

		DrawGoal (x, 2);
	}

	for (var x = 3; x < GAME.w - 3; x++) {

		DrawLives (x, 18);
	}

}

function ResetGame () {

	GAME.running = true;

	PS.statusText ("Steal The Cheese! ☜ ☞ ☝ ☟")

	PLAYER.x = 5;
	PLAYER.y = PLAYER.startY;
	PLAYER.numGoalsLeft = 0;
	PLAYER.numLivesLeft = 0;

	monX   = new Array ();
	monY   = new Array ();
	monDir = new Array ();

	DrawPlayingField ();

	DrawPawn (PLAYER.x, PLAYER.y);

	if (GAME.ticking == false) {

		GAME.ticking = true;
		PS.timerStart (GAME.clock, GameUpdate);

	}

}

function GameUpdate () {

	if (GAME.running) {

		UpdateMonsters ();

	}

}

function MovePlayer (key) {

	var oldX = PLAYER.x;
	var oldY = PLAYER.y;

	EraseBead (PLAYER.x, PLAYER.y);

	if ( (key == PS.KEY_ARROW_RIGHT || key === "Move Right") && (PLAYER.x < (GAME.w - 2)) )
			PLAYER.x += 1;

	else if ( (key == PS.KEY_ARROW_LEFT || key === "Move Left") && (PLAYER.x > 0) )
			PLAYER.x -= 1;

	else if ( (key == PS.KEY_ARROW_UP || key === "Move Up") && (PLAYER.y > 0) )
			PLAYER.y -= 1;

	else if ( (key == PS.KEY_ARROW_DOWN || key === "Move Down") && (PLAYER.y < (GAME.h - 2)) )
			PLAYER.y += 1;

	var dataAtPlayer = PS.data (PLAYER.x, PLAYER.y);

	if (dataAtPlayer == "wall") {

		PLAYER.x = oldX;
		PLAYER.y = oldY;

	}

	if (dataAtPlayer == "lives") {

		PLAYER.x = oldX;
		PLAYER.y = oldY;

	}

	if (dataAtPlayer == "blacklives") {

		PLAYER.x = oldX;
		PLAYER.y = oldY;

	}

	if (dataAtPlayer == "monster") {

		PLAYER.x = oldX;
		PLAYER.y = oldY;

		KillPlayer ();

	}

	if (dataAtPlayer == "goal") {

		DrawCompletedGoal (PLAYER.x, PLAYER.y);

		Score ();

		PLAYER.y = PLAYER.startY;

	}

	if (GAME.running) {

		DrawPawn (PLAYER.x, PLAYER.y);

	}

}

function DrawButtons (x, y, buttonDirection) {

	PS.data (x, y, buttonDirection);
	PS.color (x, y, 0x341E00);

}

function DrawWall (x, y) {

	PS.data (x, y, "wall");
	PS.color (x, y, 0x341E00);

}

function DrawMonster (x, y) {

	PS.data (x, y, "monster");
	PS.glyphColor (x, y, PS.COLOR_BLACK);
	PS.glyph (x, y, "☠");

}

function SpawnMonster (x, y, dir) {

	monX.push (x);
	monY.push (y);
	monDir.push (dir);
	DrawMonster (x, y);

}

function UpdateMonsters () {

	for (var i = 0; i < monX.length; i++) {

		EraseBead (monX [i], monY [i]);
	}


	for (var i = 0; i < monX.length; i++) {

		monX [i] += monDir [i];

		var dataAtMonster = PS.data (monX [i], monY [i]);

		if (dataAtMonster == "wall") {

			monX [i] -= monDir [i];
			monDir [i] *= -1;

		}

		if (dataAtMonster == "pawn") {

			monX [i] -= monDir [i];
			monDir [i] *= -1;

			KillPlayer ();

		}

	}

	for (var i =0; i < monX.length; i++) {

		DrawMonster (monX [i], monY [i]);
	}

}

function KillPlayer () {

	PS.audioPlay ("fx_bucket");
	EraseBead (PLAYER.x, PLAYER.y);
	PLAYER.y = PLAYER.startY;
	DrawPawn (PLAYER.x, PLAYER.y);
	Lives ();

}

function DrawGoal (x, y) {

	PS.data (x, y, "goal");
	PS.glyphColor (x, y, 0xD7BE30);
	PS.glyph (x, y, "◬");
	PLAYER.numGoalsLeft ++;

}

function DrawCompletedGoal (x, y) {

	PS.data (x, y, "wall");
	PS.glyph (x, y, "☻");
	PS.glyphColor (x, y, 0xFFFFFF);

}

function Score () {

	PLAYER.numGoalsLeft --;
	PS.audioPlay ("fx_bloop");

	if (PLAYER.numGoalsLeft <= 0) {

		GAME.running = false;

		PS.statusText ("Congrats! Press R to restart.");
		PS.gridColor (PS.COLOR_WHITE);
		PS.audioPlay ("fx_ding");

	}

}

function DrawLives (x, y) {

	PS.data (x, y, "lives");
	PS.glyphColor (x, y, 0xFF002B);
	PS.glyph (x, y, "♥");
	PLAYER.numLivesLeft ++;

}

function Lives () {

	PLAYER.numLivesLeft --;

	var x = PLAYER.numLivesLeft + 3;
	DrawBlackLives(x , 18);

	if (PLAYER.numLivesLeft <= 0) {

		GAME.running = false;

		PS.statusText ("You Lose ☹... Press R to restart.");
		PS. gridColor (PS.COLOR_WHITE);

	}
}

function DrawBlackLives (x , y) {

	PS.data (x, y, "blacklives");
	PS.glyphColor (x, y, 0x000000);
	PS.glyph (x, y, "♥");

}

// PS.init( system, options )
// Initializes the game
PS.init = function (system, options) {
	"use strict";

	// Use PS.gridSize( x, y ) to set the grid to
	// the initial dimensions you want (32 x 32 maximum)
	// Do this FIRST to avoid problems!
	// Otherwise you will get the default 8x8 grid

	PS.gridSize(GAME.w, GAME.h); // replace with your own x/y values

	// Add any other initialization code you need here
	PS.debug ("Use directional keys or touch up/down/left/right of the border to move the mouse.\n" +
			  "Avoid the poison at all cost!\n" +
			  "Obtain all the cheese and win but get hit 5 times and lose...");

	PS.fade (PS.ALL, PS.ALL, 0);
	PS.statusFade (0);

	PS.audioLoad ("fx_bucket");
	PS.audioLoad ("fx_bloop");
	PS.audioLoad ("fx_ding");

	ResetGame ();


};

// PS.touch ( x, y, data, options )
// Called when the mouse button is clicked on a bead, or when a bead is touched
PS.touch = function (x, y, data, options) {
	"use strict";

	// Uncomment the following line to inspect parameters
	// PS.debug( "PS.touch() @ " + x + ", " + y + "\n" );

	// Add code here for mouse clicks/touches over a bead
	if ( data == "Move Right" ){
		MovePlayer( data );
	}

	else if ( data == "Move Left" ){
		MovePlayer( data );
	}

	else if ( data == "Move Up" ){
		MovePlayer( data );
	}

	else if ( data == "Move Down" ){
		MovePlayer( data );
	}

};

// PS.release ( x, y, data, options )
// Called when the mouse button is released over a bead, or when a touch is lifted off a bead
PS.release = function (x, y, data, options) {
	"use strict";

	// Uncomment the following line to inspect parameters
	// PS.debug( "PS.release() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse button/touch is released over a bead
};

// PS.enter ( x, y, button, data, options )
// Called when the mouse/touch enters a bead
PS.enter = function (x, y, data, options) {
	"use strict";

	// Uncomment the following line to inspect parameters
	// PS.debug( "PS.enter() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse cursor/touch enters a bead
};

// PS.exit ( x, y, data, options )
// Called when the mouse cursor/touch exits a bead
PS.exit = function (x, y, data, options) {
	"use strict";

	// Uncomment the following line to inspect parameters
	// PS.debug( "PS.exit() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse cursor/touch exits a bead
};

// PS.exitGrid ( options )
// Called when the mouse cursor/touch exits the grid perimeter
PS.exitGrid = function (options) {
	"use strict";

	// Uncomment the following line to verify operation
	// PS.debug( "PS.exitGrid() called\n" );

	// Add code here for when the mouse cursor/touch moves off the grid
};

// PS.keyDown ( key, shift, ctrl, options )
// Called when a key on the keyboard is pressed
PS.keyDown = function (key, shift, ctrl, options) {
	"use strict";

	// Uncomment the following line to inspect parameters
	// PS.debug( "PS.keyDown(): key = " + key + ", shift = " + shift + ", ctrl = " + ctrl + "\n" );

	// Add code here for when a key is pressed

	if (GAME.running) {

		MovePlayer (key);

	} else {

		if (key == 114) {

			ResetGame ();

		}
	}

};

// PS.keyUp ( key, shift, ctrl, options )
// Called when a key on the keyboard is released
PS.keyUp = function (key, shift, ctrl, options) {
	"use strict";

	// Uncomment the following line to inspect parameters
	// PS.debug( "PS.keyUp(): key = " + key + ", shift = " + shift + ", ctrl = " + ctrl + "\n" );

	// Add code here for when a key is released
};

// PS.input ( sensors, options )
// Called when an input device event (other than mouse/touch/keyboard) is detected
PS.input = function (sensors, options) {
	"use strict";

	// Uncomment the following block to inspect parameters
	/*
	PS.debug( "PS.input() called\n" );
	var device = sensors.wheel; // check for scroll wheel
	if ( device )
	{
	    PS.debug( "sensors.wheel = " + device + "\n" );
	}
	*/

	// Add code here for when an input event is detected
};
