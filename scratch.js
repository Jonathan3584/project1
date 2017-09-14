$(function(){

var safeZones = ['173', '189', '205', '221', '237', '209', '210', '211', '212', '213', '18', '34', '50', '66', '82', '42', '43', '44', '45', '46'];
var slideStarts = ['246', '254', '96', '224', '1', '9', '31', '159'];
var slideEnds = ['242', '251', '32', '176', '4', '13', '223', '79'];
var slideMids = ['2', '3', '10', '11', '12', '47', '63', '175', '191', '207', '253', '252', '245', '244', '243', '208', '192', '80', '64', '48'];
var ends = ['157', '214', '41' , '98'];  
var stages = ['236', '193', '19', '62']

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
	boardDirection: function($square){
		var directionalId = '';
		var r = parseInt($square.attr('data-row'));
		var c = parseInt($square.attr('data-col'));
		if (r === 0) {
			directionalId = c;
		}
		if (r === 15) {
			directionalId = 45 - c;
		}
		if (c === 0 && r > 0) {
			directionalId = 60 - r;
		}
		if (c === 15) {
			directionalId = r + 15;
		}
		$square.attr('directionalId', directionalId)
		.text(directionalId);
},
	squareClass: function($square)	{
				var id = $square.attr('id');
				var r = $square.attr('data-row');
				var c = $square.attr('data-col');
				// console.log(id);
				var specialClass = '';

				if (r === '0' || r === '15' || c === '0' || c === '15' ) {specialClass = 'normal';}
				if (ends.includes(id)) {specialClass = 'end';}
				if (stages.includes(id) === true) {specialClass = 'stage';}
				if (safeZones.includes(id) === true) {specialClass = 'safe';}
				if (ends.includes(id) === true) {specialClass = 'end';}
				if (slideStarts.includes(id) === true) {specialClass = 'slideStart';}
				if (slideEnds.includes(id) === true) {specialClass = 'slideEnd';}
				if (slideMids.includes(id) === true) {specialClass = 'slideMid';}

				$square.addClass(specialClass);
				if (r === '0' || r === '15' || c === '0' || c === '15' ) {
					$square.addClass('normal');
					this.boardDirection($square);
				}
				
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
	              idCounter = idCounter +1;
	            var square = this.createSquare(r, c, $square);
	            this.squares.push(square);
	            this.squareClass($square);
	          }
	      }
	    this.renderDeck();
	    },
	bumpPiece: function(id){
		//remove victimSprite from board and from this.sprites.player[]
	},
	shuffleDeck: function(){
		//if cards left in deck object = 0, reset object
	},
	checkLegalMove: function(){
		//CHECK IF THE SQUARE HAS ANY CHILD NODES
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

	},
	createSprite: function(player) {
		return {
			color: player,
			position: 0
		}
	},
	spriteStart: function(player){
		if (this.sprites[player].length < 4) {
		var $sprite = $('<div>')
			.attr('pos', 0)
			.addClass(player)
			.addClass('sprite');
			if (player === 'yellow') {
				$sprite.appendTo("#252")
			}
			if (player === 'green') {
				$sprite.appendTo("#192")
			}
			if (player === 'red') {
				$sprite.appendTo("#3")
			}
			if (player === 'blue') {
				$sprite.appendTo("#62")
			}
			var sprite = this.createSprite(player);
			this.sprites[player].push(sprite);
			console.log(this.sprites);
		}
	},
	spriteSlide: function(sprite, newDiv){
		
		var position = this.sprites[player].position;
		if (twoSlide) {
			position = position + 2;
			return newDiv = newDiv;
		}
		if (threeSlide) {
			position = position + 3;
			return newDiv = newDiv;
		}
	},
	spriteEnd: function(){
		//remove sprite from game.sprites.player[]
		//remove sprite from board
		//add sprite to game.endSprites.player[]
		this.winCheck();
	},
	spriteMove: function(sprite, cardValue){
		var position = this.sprites[player].position;
		position = position + cardValue;
		//DETERMINE HOW TO MOVE THE SPRITES TO DIVS AROUND CORNERS

		if (newDiv.hasClass(slideStart)) {spriteSlide(sprite, newDiv)};

		
		//if (array position === 65) spriteEnd()};
	},
	exchangeSprites: function(sprite, enemySprite) {
		//LOGIC TO EXCHANGE TWO SPRITE POSITIONS
		//LOGIC TO MAKE START CONDITIONS FOR SORRY CARDX
	},
	nextTurn: function() {
			if (card !== '2') {
				//Add one to the index of the player array to change whose 
				player = this.player[i + 1];
			}
			else player = this.player[i]
			},
	sevenCard: function(player){
				// DETERMINE LEGAL ARRAY
				// var n = USER INPUT FOR parts of seven;
				var arrSeven = [n, 7 - n]
				for (var i = 0; i < 2; i++) {
					arrSeven[i]
					this.spriteSelect(player, legalArr);
					this.spriteMove(sprite, card);
				}
				this.shuffleDeck();
				this.nextTurn();
		},
	tenCard: function(player){
		//DETERMINE LEGAL ARRAY
		//PROMPT USER FOR +10 or -1
		if (10 === true) {
			card = 10;
			this.spriteSelect(player, legalArr);
			this.spriteMove(sprite, card);
			this.shuffleDeck();
			this.nextTurn();
		}
		if (-1 === true) {
			card = -1;
			this.spriteSelect(player, legalArr);
			this.spriteMove(sprite, card);
			this.shuffleDeck();
			this.nextTurn();
		}
	},
	elevenCard: function(player){
		//DETERMINE LEGAL ARRAY
		//PROMPT USER FOR 11 or SWAP
		if (11 === true) {
			card = 11;
			this.spriteSelect(player, legalArr);
			this.spriteMove(sprite, card);
			this.shuffleDeck();
			this.nextTurn();
		}
		if ('swap' === true) {
			//PROMPT FOR ENEMY SPRITE SELECTION
			this.echangeSprites();
		}
	},
	sorryCard: function(){
		//PROMPT FOR ENEMY SPRITE SELECTION
		if (sprites.length + endSprites.length <= 3) {
			eschangeSprites()
		}
	},
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
				else 
				alert('Choose your piece!');
				this.spriteSelect(player, legalArr);
				this.spriteMove(sprite, card);
				this.shuffleDeck();
				this.nextTurn();

			if (card !== '2') {
				//Add one to the index of the player array to change whose 
				player = this.player[i + 1];
			}
			else player = this.player[i]
	 	}
},
	winCheck: function(){}

}

game.renderBoard();
})