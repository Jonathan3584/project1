var topGame;

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
		var safetyId = '';
		var r = parseInt($square.attr('data-row'));
		var c = parseInt($square.attr('data-col'));
		if (c === 2 && r < 9) { 
			safetyId = "r" + r;
			$square.addClass('red');
		}
		if (r === 2 && c > 9) {
			safetyId = "b" + (15 - c);
			$square.addClass('blue')
		}
		if (c === 13 && r > 9) {
			safetyId = "y" + (15 - r);
			$square.addClass('yellow')
				}
		if (r === 13 && c < 9) {
			safetyId = "g" + c;
			$square.addClass('green')
		}
		$square.attr('safetyId', safetyId)
		.text("S" +safetyId);
	},
	slide: function($square){
		var r = parseInt($square.attr('data-row'));
		var c = parseInt($square.attr('data-col'));
		if (r === 0) {$square.addClass('red')}
		if (c === 0) {$square.addClass('green')}
		if (c === 15) {$square.addClass('blue')}
		if (r === 15) {$square.addClass('yellow')}
	},
	stage: function($square){
		var r = parseInt($square.attr('data-row'));
		var c = parseInt($square.attr('data-col'));
		if (r === 1) {$square.addClass('red')}
		if (c === 1) {$square.addClass('green')}
		if (c === 14) {$square.addClass('blue')}
		if (r === 14) {$square.addClass('yellow')}
	},
	squareClass: function($square){
				var id = $square.attr('id');
				var r = $square.attr('data-row');
				var c = $square.attr('data-col');
				// console.log(id);
				var specialClass = '';

				if (r === '0' || r === '15' || c === '0' || c === '15' ) {specialClass = 'normal';}
				if (ends.includes(id)) {specialClass = 'end';}
				if (stages.includes(id) === true) {specialClass = 'stage';
					this.stage($square);
				}
				if (safeZones.includes(id) === true) {specialClass = 'safe';
					this.safeSpaces($square);
				}
				if (ends.includes(id) === true) {specialClass = 'end';}
				if (slideStartA.includes(id) === true) {specialClass = 'slideStartA';
					this.slide($square);
				}
				if (slideStartB.includes(id) === true) {specialClass = 'slideStartB';
					this.slide($square);
				}
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
			console.log(grab);
			if ($(grab).children().length === 0) {
				legalArr.push(this.sprites[player][i]);
				this.sprites[player][i].element.addClass('highlighted');
				}
			if ($(grab).children().length > 0 
				&& $(grab).children()[0].classList.contains(player) === false) {
				legalArr.push(this.sprites[player][i]);
				this.sprites[player][i].element.addClass('highlighted');
				}
		}
		if ((this.sprites[player].length + this.endSprites[player].length) < 4) {
			$('.stage').addClass('highlighted')
		}
		console.log(legalArr)
		return this.spriteSelect(legalArr, card, player);
	},
	drawCard: function(){
		var length = this.deck.length;
		var randIndex = Math.floor(Math.random()*length);
		var card = this.deck[randIndex];
		$('#deck1').text(card)
		this.deck.splice(randIndex, 1);
		return card;
	},	
	spriteSelect: function(legalArr, card, player){
		var selectedSprite = '';
		for (i = 0; i < legalArr.length; i++) {
			var legalSprite = legalArr[i];
			legalSprite.element.on('click', function(el){
				console.log( selectedSprite = $(this));
			})
		}
		if ((this.sprites[player].length + this.endSprites[player].length) < 4) {
			$('.stage').on('click', function(event){
				console.log(selectedSprite = 'NEW');
			})
			}
			// .on('click', function(event);
			
		
		//return $(this)sprite OR startSprite();
		//Remove clickListeners

	},
	createSprite: function($sprite, player) {
		return {
			color: player,
			position: 0,
			element: $sprite
		}
	},
	spriteStart: function(player){
		if ((this.sprites[player].length + this.endSprites[player].length) < 4) {
		var $sprite = $('<div>')
			.attr('pos', 0)
			.addClass(player)
			.addClass('sprite');
			
			var sprite = this.createSprite($sprite, player);
			this.sprites[player].push(sprite);
			console.log(this.sprites);
			var id = player + (this.sprites[player].length -1);
			$sprite.attr('id', id);

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
		}
	},
	spriteSlideA: function(player, boardPosition){
			for (var i = 0; i < 4; i++) {
			var bumpSquare = "[directionalId = '" + (boardPosition + i).toString() + "']";
			this.bumpPiece($(bumpSquare));
			}
	},
	spriteSlideB: function(player, boardPosition){
			for (var i = 0; i < 5; i++) {
			var bumpSquare = "[directionalId = '" + (boardPosition + i).toString() + "']";
			this.bumpPiece($(bumpSquare));
			}
	},
	spriteEnd: function(sprite, player){
		var strPlayer = "[id ='" + player + "']";
		sprite.element.appendTo($(strPlayer));

		// var stringId = $(sprite).attr('id');
		// var spriteIndex = parseInt(stringId.charAt(stringId.length - 1));
		this.sprites[player].splice([spriteIndex], 1);

		var retiredSprite = this.createSprite(player);
		this.endSprites[player].push(retiredSprite);
		
		this.winCheck(player);
	},
	spriteMove: function(sprite, card, player){
		sprite.position = sprite.position + card;

		var position = sprite.position;

		var boardPosition = position + this.playerConstant[player];
		if (boardPosition > 59) {boardPosition = boardPosition - 60;}
		var grab = "[directionalId = '" + boardPosition.toString() + "']";
		
		if (position >= 65) {
			this.spriteEnd(sprite, player);
		}

		if ($(grab).hasClass('slideStartA') &&! $(grab).hasClass(player)) {
			this.spriteSlideA(sprite, boardPosition);
			sprite.position += 3;
			boardPosition += 3;
			grab = "[directionalId = '" + boardPosition.toString() + "']";
			sprite.element.appendTo($(grab));
		}
		if ($(grab).hasClass('slideStartB') &&! $(grab).hasClass(player)) {
			this.spriteSlideB(sprite, boardPosition);
			sprite.position += 4;
			boardPosition += 4;
			grab = "[directionalId = '" + boardPosition.toString() + "']";
			sprite.element.appendTo($(grab));
		}
		if (position >= 60) {
			var safePosition = position - 59;
			var safeGrab = "[safetyID = '" + player.charAt(0) + safePosition.toString() + "'";
			sprite.element.appendTo($(safeGrab));
		}

		else sprite.element.appendTo($(grab));
			
		
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
		if (this.endSprites[player].length === 4) {
			alert(player + ' WINS!');
		}
	}

}

game.renderBoard();
game.spriteStart('green');
game.spriteMove(game.sprites.green[0], 5, 'green')
game.spriteStart('yellow')
game.spriteMove(game.sprites.yellow[0], 12, 'yellow')
game.spriteMove(game.sprites.yellow[0], 1, 'yellow')
game.spriteMove(game.sprites.green[0], 1, 'green')
game.spriteStart('yellow')
game.spriteMove(game.sprites.yellow[1], 12, 'yellow')
game.checkLegalMove(4, 'yellow')



topGame = game;


})









