$(function(){

var safeZones = ['173', '189', '205', '221', '237', '209', '210', '211', '212', '213', '18', '34', '50', '66', '82', '42', '43', '44', '45', '46'];
var slideStartA = ['1', '254', '31', '224'];
var slideStartB = ['246', '96', '9', '159'];
var slideMids = ['2', '3', '10', '11', '12', '47', '63', '175', '191', '207', '253', '252', '245', '244', '243', '208', '192', '80', '64', '48', '242', '251', '32', '176', '4', '13', '223', '79'];
var ends = ['157', '214', '41' , '98'];  
var stages = ['236', '193', '19', '62'];
var globalDeck = [
		1, 1, 1, 1, 1,
		2, 2, 2, 2,
		3, 3, 3, 3,
		4, 4, 4, 4,
		5, 5, 5, 5,
		'sorry', 'sorry', 'sorry', 'sorry',
		7, 7, 7, 7,
		8, 8, 8, 8,
		10, 10, 10, 10,
		11, 11, 11, 11,
	];

var game = {

	squares: [],

	player: ['yellow', 'green', 'red', 'blue'],

	playerConstant: {
		yellow: 33,
		green: 48,
		red: 3, 
		blue: 18,
	},

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

	deck: globalDeck,

	squareClasses: [],

	createSquare: function(row, col, el){
		return {
			row: row,
			col: col,
			position: '',
		}
	},
	renderDeck: function(){
		for (var i = 0; i < 2; i ++) {
		var $deck = $('<div>')
		.attr('id', 'deck' + i)
		.appendTo('#deckbox')
		.addClass('deck')
	}
		$('#deck0').on('click', game.handleTurn);
		this.makePlayers(this.player);		
	},
	makePlayers: function(arr){
		for (var i = 0; i < arr.length; i++) {
		var $player = $('<div>')
		.appendTo('#deckbox')
		.attr('id', this.player[i])
		.addClass('name').
		text(this.player[i]);
		}
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
	safeSpaces: function($square){
		var directionalId = '';
		var r = parseInt($square.attr('data-row'));
		var c = parseInt($square.attr('data-col'));
		if (c === 2 && r < 10) { 
			directionalId = r;
		}
		if (r === 2 && c > 10) {
			directionalId = 15 - c;
		}
		if (c === 13 && r > 10) {
			directionalId = 30 -r;
		}
		if (r === 13 && c < 10) {
			directionalId = c;
		}
		$square.attr('directionalId', directionalId)
		.text(directionalId);
	},
	squareClass: function($square){
				var id = $square.attr('id');
				var r = $square.attr('data-row');
				var c = $square.attr('data-col');
				// console.log(id);
				var specialClass = '';

				if (r === '0' || r === '15' || c === '0' || c === '15' ) {specialClass = 'normal';}
				if (ends.includes(id)) {specialClass = 'end';}
				if (stages.includes(id) === true) {specialClass = 'stage';}
				if (safeZones.includes(id) === true) {specialClass = 'safe';
					this.safeSpaces($square);
				}
				if (ends.includes(id) === true) {specialClass = 'end';}
				if (slideStartA.includes(id) === true) {specialClass = 'slideStartA';}
				if (slideStartB.includes(id) === true) {specialClass = 'slideStartB';}
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
		if (this.deck.length === 0) {
			this.deck = globalDeck;
		}
	},
	checkLegalMove: function(card, player){
		var legalArr = [];
		var playerArr = this.sprites[player];

		for (var i = 0; i < playerArr.length; i++) {

			var position = this.sprites[player][i].position + card;
			var boardPosition = position + this.playerConstant[player];
			var grab = "[directionalId = '" + boardPosition.toString() + "']";
			var classCheck = "'." + player + "'";
			
			var conflict = $(grab).children()[0];
			console.log(conflict);
			// if ($(grab).children().length !== 0 && ) {legalArr.push();}
		}



		// if (grabNodes === true) {
		// 	legalArr.push(sprite)
		// }

		
		//return legalArr
	},
	drawCard: function(){
		var length = this.deck.length;
		var randIndex = Math.floor(Math.random()*length);
		var card = this.deck[randIndex];
		$('#deck1').text(card)
		this.deck.splice(randIndex, 1);
		return card;
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
				$sprite.appendTo("#63")
			}
			var sprite = this.createSprite(player);
			this.sprites[player].push(sprite);
			var id = player + (this.sprites[player].length -1);
			$sprite.attr('id', id);
		}
	},
	spriteSlideA: function( boardPosition){

		for (var i = 0; i < 4; i++) {
			var bumpSquare = "[directionalId = '" + (boardPosition + i).toString() + "']";
			this.bumpPiece(bumpSquare);
			console.log(bumpSquare);
		}
	},
	spriteSlideB: function(sprite, boardPosition){

		for (var i = 0; i < 5; i++) {
			var bumpSquare = "[directionalId = '" + (boardPosition + i).toString() + "']";
			this.bumpPiece(bumpSquare);
			console.log(bumpSquare);		
		}
		
	},
	spriteEnd: function(){
		//remove sprite from game.sprites.player[]
		//remove sprite from board
		//add sprite to game.endSprites.player[]
		this.winCheck(player);
	},
	moveSafe: function(sprite){
		//MOVE INTO THE SAFE ZONE INSTEAD OF AROUND THE CIRCLE.
	},
	spriteMove: function(sprite, card, player){
		var stringId = $(sprite).attr('id');
		var spriteIndex = parseInt(stringId.charAt(stringId.length - 1));
		this.sprites[player][spriteIndex].position = this.sprites[player][spriteIndex].position + card;

		var position = this.sprites[player][spriteIndex].position;
		var boardPosition = this.sprites[player][spriteIndex].position + this.playerConstant[player];
		if (boardPosition > 59) {boardPosition = boardPosition - 60;}
		var grab = "[directionalId = '" + boardPosition.toString() + "']";
		console.log(grab);
		
		sprite.appendTo($(grab));

		if ($(grab).hasClass('slideStartA')) {
			this.spriteSlideA(sprite, boardPosition);
			this.sprites[player][spriteIndex].position += 3;
			boardPosition += 3;
			grab = "[directionalId = '" + boardPosition.toString() + "']";
			sprite.appendTo($(grab));
		}
		if ($(grab).hasClass('slideStartB')) {
			this.spriteSlideB(sprite, boardPosition);
			this.sprites[player][spriteIndex].position += 4;
			boardPosition += 4;
			grab = "[directionalId = '" + boardPosition.toString() + "']";
			sprite.appendTo($(grab));
		}
		

		// if (position >= 60) {
		// 	this.safeMove(sprite, position);
		
	},
	exchangeSprites: function(sprite, enemySprite) {
		//LOGIC TO EXCHANGE TWO SPRITE POSITIONS
		//LOGIC TO MAKE START CONDITIONS FOR SORRY CARDX
	},
	nextTurn: function(player, card) {
			if (card !== '2') {
				player = this.player[i + 1];
			}
			else player = this.player[i]
			},
	twoCard: function(player){

	},
	sevenCard: function(player){
		var x = 0;
				// DETERMINE LEGAL ARRAY
		// 		// var n = USER INPUT FOR parts of seven;
		// 		var arrSeven = [n, 7 - n]
		// 		for (var i = 0; i < 2; i++) {
		// 			arrSeven[i]
		// 			this.spriteSelect(player, legalArr);
		// 			this.spriteMove(sprite, card);
		// 		}

		// 		this.shuffleDeck();
		// 		this.nextTurn();
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
			this.exchangeSprites();
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
			if (card === '2') {
				this.twoCard(player);
			}
			if (card === '7') {
				this.sevenCard(player);
			}
			if (card === '10') {
				this.tenCard(player);
			}
			if (card === '11') {
				this.elevenCard();
			}
			if (card === 'sorry') {
				this.sorryCard(player);
			}
			else {
			this.checkLegalMove(player, card);
				if (legalArr.length === 0) {
					return alert('Sorry! No legal moves!');
				}
				else 
				alert('Choose your piece!');
				this.spriteSelect(player, legalArr);
				this.spriteMove(sprite, card, player);
				this.nextTurn();
			}
		},
	winCheck: function(player){
		if (endSprites[player].length === 4) {
			alert(player + ' WINS!');
		}
	}

}

game.renderBoard();
game.spriteStart('green');
game.spriteMove($('#green0'), 3, 'green');
game.spriteStart('green');
game.drawCard();
// console.log(game.sprites);
game.checkLegalMove(3, 'green');
// game.spriteMove($('#green0'), 3, 'green');
// game.spriteMove($('#green0'), 3, 'green');
// console.log(game.sprites);

// game.spriteSlideB($('green0'), 54);




})









