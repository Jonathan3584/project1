$(function(){

var game = {
	squares: [],

	player: '',

	sprites: {
		green: [],
		red: [],
		yellow: [],
		blue: []
	},

	endSprites: {
		green: [],
		red: [],
		yellow: [],
		blue: []
	}

	deck: {
		1: 5,
		2: 4,
		3: 4,
		4: 4,
		5: 4,
		7: 4,
		8: 4,
		10: 4,
		11: 4,
		12: 4,
		sorry: 4,
	},

	squareClasses: [],

	createSquare: function(row, col, el){
		return {
			row: row,
			col: col,
			specialClass: function(row, col)
			{
				// start square conditions; 
				// staging square conditions; [DECORATIVE, NOT FUNCTIONAL]
				// safe square conditions;
				// end square conditions;
				// normal play square conditions;
				// safe entry conditions;
				// slide start conditions;
				// slide end conditions;
				// slide mid conditions;
			}
			position: '',
		}
	},
	renderBoard: function(){
	//clear board div
		var $board = $('#board').empty();
	      //access squares array to set content
	      this.squares = [];
	      //create board
	      for(var r = 0; r < 16; r++){
	        var $row = $('<div>')
	          .addClass('row')
	          // .width(202 * game.size)
	          .appendTo($board);
	          for(var c = 0; c < 16; c++){
	            var $square = $('<div>')
	              .addClass('square')
	              .appendTo($row)
	              .attr('data-row', r)
	              .attr('data-col', c)
	              .on('click', game.handleTurn)
	            var square = this.createSquare(r, c, $square);
	            this.squares.push(square);
	          }
	      }
	    },
	bumpPiece: function(row, col){
		//remove victimSprite from board and from this.sprites.player[]
	},
	shuffleDeck: function(){
		//if cards left in deck object = 0, reset object
	},
	checkLegalMove: function(){
		//check for legal move (existent move that doesn't end w/ shared square)
		//var legalArr = []
		//push(sprites with legal moves)
		//return legalArr
	},
	drawCard: function(){
		//randomly select card from deck object
		//remove card from deck object
		//return instruction from card
	};	
	spriteSelect: function(player, legalArr){
		//Add clickListener to team sprites within the legalArr
		//if (this.sprites.player.length > 4) {
		//	add clickListener to start space
		//}
		//return $(this)sprite OR startSprite();
		//Remove clickListeners

		//FIGURE OUT HOW TO INSTITUTE SPLIT CARDS -- 7s, 10s, 11s, SORRY
	},
	spriteStart: function(){
		//if (sprites.player.length > 4), CREATE A NEW SPRITE
	},
	spriteSlide(row, col)
		//if ($('.slide .start').includes(row,col)){
		// 	bumpPiece(COORDEINATES OF ASSOCIATED SLIDE)
		// }
		//Add slide to sprite position
		//Move sprite
	spriteEnd: function(){
		//remove sprite from game.sprites.player[]
		//remove sprite from board
		//add sprite to game.endSprites.player[]
	},
	spriteMove: function(sprite, card){
		//Increase the position variable in the sprite array by the card.
		//Move sprite on board;
		//spriteSlide(row, col);
		//bumpPiece(row,col)};
		//if array position === spriteEnd()};
		

	},
	handleTurn: function(){
		var card = drawCard();
			this.checkLegalMove();
			if (legalArr.length === 0) {
				return alert('Sorry! No legal moves!');
			}
			else {
			alert('Choose your piece!');
			this.spriteSelect(player, legalArr);
			this.spriteMove(sprite, card);
			this.shuffleDeck();
			this.winCheck();
		}
		}
	},
	winCheck: function(){}

}
game.renderBoard();
})