$(function(){

var game = {

	squares: [],

	player: ['yellow', 'green', 'red', 'blue'],

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
	},

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
			position: '',
		}
	},
	renderDeck: function(){
		var $deck = $('<div>')
		.addClass('deck')
		.appendTo('body')
		.on('click', game.handleTurn);		
		},
	squareClass: function($square)	{
				var id = $square.attr('id');
				// console.log(id);
				var specialClass = '';
				if (id === '157' || id === '214' || id === '41' || id === '98') {specialClass = 'end';}
				// start square conditions; 
				if (id === '235' || id === '193' || id === '19' || id === '62') {specialClass = 'stage';}
				// safe square conditions;
				
				// normal play square conditions;
				// safe entry conditions;
				// slide start conditions;
				// slide end conditions;
				// slide mid conditions;
				console.log(specialClass);
				$square.addClass(specialClass);
				// console.log($square);

			},
	renderBoard: function(){
		var idCounter = 0;
	//clear board div
		var $board = $('#board').empty();
	      //access squares array to set content
	      this.squares = [];
	      //create board
	      for(var r = 0; r < 16; r++){
	        var $row = $('<div>')
	          .addClass('row')
	          .appendTo($board);
	          for(var c = 0; c < 16; c++){
	          	
	            var $square = $('<div>')
	              .addClass('square')
	              .appendTo($row)
	              .attr('data-row', r)
	              .attr('data-col', c)
	              .attr('id', idCounter)
	              .text(idCounter);
	              idCounter = idCounter +1;
	            var square = this.createSquare(r, c, $square);
	            this.squares.push(square);
	            this.squareClass($square);
	          }
	      }
	    this.renderDeck();
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
		//return card
	},	
	spriteSelect: function(player, legalArr){
		//Add clickListener to team sprites within the legalArr
		//if (this.sprites.player.length < 4) {
		//	add clickListener to start space
		//}
		//return $(this)sprite OR startSprite();
		//Remove clickListeners

		//FIGURE OUT HOW TO INSTITUTE SPLIT CARDS -- 7s, 10s, 11s, SORRY
	},
	createSprite: function(player, pos) {
		return {
			color: player,
			position: pos,
		}
	},
	spriteStart: function(player){
		//if (sprites.player.length > 4)
		var $sprite = $('<div>')
			.appendTo('#board')
			.attr('pos', 0)
			.addClass(sprite);
			var sprite = this.createSprite(player, pos);
			this.sprites[player].push(sprite);

	},
	spriteSlide: function(row, col){
		//if ($('.slide .start').includes(row,col)){
		// 	bumpPiece(COORDEINATES OF ASSOCIATED SLIDE)
		// }
		//Add slide to sprite position
		//Move sprite
	},
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

	nextTurn: function() {
			if (card !== '2') {
				//Add one to the index of the player array to change whose 
				player = this.player[i + 1];
			}
			else player = this.player[i]
			},
	sevenCard: function(){},
	tenCard: function(){},
	elevenCard: function(){},
	sorryCard: function(){},
	handleTurn: function(PLACEHOLDER){

		var card = drawCard();
		var player = this.player[i];
			if (card === '7') {
				this.sevenCard();
			}
			if (card === '10') {
				this.tenCard();
			}
			if (card === '11') {
				this.elevenCard();
			}
			if (card === 'sorry') {
				this.sorryCard();
			}
			else {
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
				this.nextTurn();

			if (card !== '2') {
				//Add one to the index of the player array to change whose 
				player = this.player[i + 1];
			}
			else player = this.player[i]
		}
}
},
	winCheck: function(){}

}

game.renderBoard();
})