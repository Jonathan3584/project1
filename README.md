# project1j
Game Project for WDI


Name of the Game:  Sorry!

Rules (pulled from Wikipedia):

I used object oriented programming to build my game as an object with functions as many of the values.  For some items, such as the deck, or squares that behave in a given manner, I created global variables with arrays of information that could be referenced by the object but left unchanged.

The approach I took was to write a skeleton of known functions (drawCard, moveSprite, etc) and write the logic for them as individual values in the game object.  As they required further functionality, I did my best to break them down into smaller functions that could reference once another.  I was successful using this model, but ran into many functions that required a huge number of logical conditionals.  Some of these functions, such as the "spriteMove" function ballooned.

I looked at the path a sprite takes in the game as a linear journey from 0 to 65.  Each player has a defined start point and end point -- this is accounted for by a player constant.

The game does not start with pieces on the board, so a function was written to introduce and append game pieces when conditions are met to start.  The program also prevents the player from introducing more game pieces than are allowed.

Win conditions are assessed based on array lengths.

Pieces are manipulated by click listeners, but are automatically moved the number of squares that the cards require.

One of the more difficult undertakings of this project was creating the conditions to insure that a player made a legal move.  My legal move conditions are robust, and the player will only be presented with legal moves.  When no legal move is available, the game will automatically pass on to the next player.

Problems that still remain are the alternative actions associated with 7, 10, and 11 cards in the traditional game.  These present options of movement to the user.

The game could also use more time in styling.  Because of the board size, it was not reasonable to institute media queries for smaller screens.  The styling was rushed because I prioritized debugging.  The logic of this game was a more compelling challenge than the styling, which I will update later.

It will be an easy upgrade at some point to make the game respond to the number of players.  I did not allocate enough time to do it before the project deadline.

Minimum viable product:

-As a user, I need an accurate game board with sprites.  DONE
-As a user, I need deck randomizer set to Sorry! deck specs.  DONE
-As a user, I need piece movement linked to the deck randomizer.  DONE
-As a user, I need limitations to insure start conditions are met.  DONE
-As a user, I need acknowledgement of win conditions.  DONE
-As a user, I need playability for 2 players.  DONE


Reach Goals: 

-As a user, I want playability for 2-4 players.
-As a user, I want animated piece movements.
-As a user, I want scoreboard for multiple games.
-As a user, I want in-site game reset.
-As a user, I want player name storage.
-As a user, I want "relaxation start" functionality.
-As a user, I want responsive board size.

Foreseen challenges:

-While board logic is repetitive, the physical representation will be rotated.
-Areas of the board will require different sprite response.
-Movement around corners will be an animation difficulty.
-User chooses which of four sprites to apply movement to.
-Sprites on same square logic differs.

Technology I used:

-Vanilla Javascript with jquery as needed for core game logic and DOM manipulation.  The entire game was built as an object in the DOM.
-HTML for writing the homepage.  
-CSS for styling all elements of the game.
Wire Framing

Landing site:
https://wireframe.cc/j6UcU3
Game page:
https://wireframe.cc/MeUBvv

