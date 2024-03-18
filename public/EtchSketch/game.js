// game.js for Perlenspiel 3.1.1
// Perlenspiel is a scheme by Professor Moriarty (bmoriarty@wpi.edu).
// Perlenspiel is Copyright © 2009-14 Worcester Polytechnic Institute.
// This file is part of Perlenspiel.

//     Project Title:	Sketch
//            Author:	Timothy Hatch
//              Date:	04/13/14


var Grid_W = 20;
var Grid_H = 20;

var GridColor  = 0x616161;
var Draw_Color = 0x494949;

var Left  = 0X25C4;
var Right = 0x25BA;
var Up    = 0x25B2;
var Down  = 0X25BC;

var EX = 9;
var EY = 8;


// Put your function definitions after this line

function EtchStart () {

	PS.color (PS.ALL, PS.ALL, GridColor);

	PS.color (PS.ALL, 0, PS.COLOR_RED);
	PS.color (0, PS.ALL, PS.COLOR_RED);
	PS.color (19, PS.ALL, PS.COLOR_RED);
	for (var x = 0; x < 20; x++) {

		for (var y = 16; y < 20; y++) {

			PS.color(x, y, PS.COLOR_RED);
		}
	}

}

function DrawColor () {

	PS.color (EX, EY, Draw_Color);
}

function DrawButtons () {

	PS.glyph       (1, 18, Left);
	PS.data        (1, 18, "Move Left");
	PS.color       (1, 18, PS.COLOR_WHITE);
	PS.border      (1, 18, 3);
	PS.borderColor (1, 18, GridColor);

	PS.glyph       (3, 18, Right);
	PS.data        (3, 18, "Move Right");
	PS.color       (3, 18, PS.COLOR_WHITE);
	PS.border      (3, 18, 3);
	PS.borderColor (3, 18, GridColor);

	PS.glyph       (16, 18, Up);
	PS.data        (16, 18, "Move Up");
	PS.color       (16, 18, PS.COLOR_WHITE);
	PS.border      (16, 18, 3);
	PS.borderColor (16, 18, GridColor);

	PS.glyph       (18, 18, Down);
	PS.data        (18, 18, "Move Down");
	PS.color       (18, 18, PS.COLOR_WHITE);
	PS.border      (18, 18, 3);
	PS.borderColor (18, 18, GridColor);
}

function ClearButton () {

	PS.glyph ( 7, 18, "C");
	PS.glyph ( 8, 18, "L");
	PS.glyph ( 9, 18, "E");
	PS.glyph (10, 18, "A");
	PS.glyph (11, 18, "R");

	PS.data  ( 7, 18, "Clear");
	PS.data  ( 8, 18, "Clear");
	PS.data  ( 9, 18, "Clear");
	PS.data  (10, 18, "Clear");
	PS.data  (11, 18, "Clear");

	for (var x = 7; x < 12; x++) {

		for (var y = 18; y == 18; y++) {

			PS.color(x, y, PS.COLOR_WHITE);
		}
	}

}

// PS.init( system, options )
// Initializes the game
PS.init = function (system, options) {
	"use strict";

	// Use PS.gridSize( x, y ) to set the grid to
	// the initial dimensions you want (32 x 32 maximum)
	// Do this FIRST to avoid problems!
	// Otherwise you will get the default 8x8 grid

	PS.gridSize(Grid_W, Grid_H); // replace with your own x/y values

	// Add any other initialization code you need here

	PS.statusText ("Etch-A-Sketch!");

	PS.border (PS.ALL, PS.ALL, 0);

	EtchStart ();
	DrawButtons ();
	ClearButton ();
	DrawColor ();

	PS.audioLoad ("fx_bloop");
	PS.audioLoad ("fx_scratch");

};

// PS.touch ( x, y, data, options )
// Called when the mouse button is clicked on a bead, or when a bead is touched
PS.touch = function (x, y, data, options) {
	"use strict";

	// Uncomment the following line to inspect parameters
	// PS.debug( "PS.touch() @ " + x + ", " + y + "\n" );

	// Add code here for mouse clicks/touches over a bead


	if (data == "Move Left" && EX > 1) {
		EX = EX - 1;
			PS.audioPlay ("fx_bloop");
	}

	if (data == "Move Right" && EX < 18) {
		EX = EX + 1;
			PS.audioPlay ("fx_bloop");
	}

	if (data == "Move Up" && EY > 1) {
		EY = EY - 1;
		PS.audioPlay ("fx_bloop");
	}

	if (data == "Move Down" && EY < 15) {
		EY = EY + 1;
		PS.audioPlay ("fx_bloop");
	}

	DrawColor ();

	if (data == "Clear") {
		PS.init ();
		PS.audioPlay ("fx_scratch");
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
	if (data != 0) {
		PS.color (x, y, PS.COLOR_GREEN);
	}
	if (data == "Clear") {

		for (var x = 7; x < 12; x++) {

			for (var y = 18; y == 18; y++) {

				PS.color(x, y, PS.COLOR_BLUE);
			}
		}
	}


	// Uncomment the following line to inspect parameters
	// PS.debug( "PS.enter() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse cursor/touch enters a bead
};

// PS.exit ( x, y, data, options )
// Called when the mouse cursor/touch exits a bead
PS.exit = function (x, y, data, options) {
	"use strict";

	if (data != 0) {
		PS.color (x, y, PS.COLOR_WHITE);
	}

	if (data == "Clear") {

		for (var x = 7; x < 12; x++) {

			for (var y = 18; y == 18; y++) {

				PS.color(x, y, PS.COLOR_WHITE);
			}
		}
	}


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
