var topGame;

$(function(){


var safeZones = ['173', '189', '205', '221', '237', '209', '210', '211', '212', '213', '18', '34', '50', '66', '82', '42', '43', '44', '45', '46'];
var slideStartA = ['1', '254', '31', '224'];
var slideStartB = ['246', '96', '9', '159'];
var slideMids = ['2', '3', '10', '11', '12', '47', '63', '175', '191', '207', '253', '252', '245', '244', '243', '208', '192', '80', '64', '48', '242', '251', '32', '176', '4', '13', '223', '79'];
var ends = ['157', '214', '41' , '98'];  
var stages = ['236', '193', '19', '62'];
const globalDeck = [
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
		12, 12, 12, 12
	];

var game = {

	turn: 0,

	squares: [],

	player: ['yellow', 'green', 'red', 'blue'],

	card: 0,

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

	deck: [],

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
		$('#deck0').on('click', game.drawCard);
		var mapDeck = globalDeck.map(function(x){return x});
		game.deck = mapDeck;
		game.makePlayers(game.player);		
	},
	makePlayers: function(arr){
		for (var i = 0; i < arr.length; i++) {
		var $player = $('<div>')
		.appendTo('#deckbox')
		.attr('id', game.player[i])
		.addClass('name').
		text(game.player[i]);
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
	bumpPiece: function($square){
		if ($square.children()[0] !== undefined) {
		var victimIndex = $square.children(":first").attr('pos');
		var victimPlayer = $square.children(":first").attr('class').split(' ')[0];
		game.sprites[victimPlayer].splice([victimIndex], 1);
		$square.empty();
		console.log(game.sprites);}
	},
	shuffleDeck: function(){
		console.log(game.card)
		if (game.deck.length === 0) {
			var mapDeck = globalDeck.map(function(x){return x});
			game.deck = mapDeck;
		}
	},
	legalStart: function(player){

			if (player === 'yellow' && $('#252').children()[0].classList.contains(player) === false) {
				console.log(('#252').children()[0].classList);
			
				return true;
			}
			if (player === 'green' && $('#192').children()[0].classList.contains(player) === false) {
				return true
			}
			// }
			if (player === 'red' && $('#3').children()[0].classList.contains(player) === false) {
				return true
			}
			// }
			if (player === 'blue' && $('#63').children()[0].classList.contains(player) === false) {
				return true
		}
			else return false;
			
	},
	checkLegalMove: function(player){
		var legalArr = [];
		var playerArr = game.sprites[player];
		var startCheck = game.legalStart(player);
		for (var i = 0; i < playerArr.length; i++) {
			var position = game.sprites[player][i].position + game.card;
			var boardPosition = position + game.playerConstant[player];
			var grab = "[directionalId = '" + boardPosition.toString() + "']";
			console.log(grab);
			if ($(grab).children().length === 0) {
				legalArr.push(game.sprites[player][i]);
				game.sprites[player][i].element.addClass('highlighted');
				}
			if ($(grab).children().length > 0 
				&& $(grab).children()[0].classList.contains(player) === false) {
				legalArr.push(game.sprites[player][i]);
				game.sprites[player][i].element.addClass('highlighted');
				}
		}
		if ((game.sprites[player].length + game.endSprites[player].length) < 4 &&
				startCheck === true && 
				game.card < 3) {
			$('.stage').addClass('highlighted');
			$('.stage').on('click', this.spriteStart);
		}
		console.log(legalArr)
		return this.listenersOn(legalArr, player);
	},
	drawCard: function(){
		var length = game.deck.length;
		var randIndex = Math.floor(Math.random()*length);
		var card = game.deck[randIndex];
		$('#deck1').text(card)
		game.deck.splice(randIndex, 1);
		game.card = card;
		game.shuffleDeck();
		game.handleTurn();
	},	
	selectSprite: function(){

		console.log($(this));
		var player = $(this).attr('class').split(' ')[0];
		var x = $(this).attr('id');
		var y = parseInt(x.charAt(x.length - 1));
		console.log(game.sprites[player][y])
		var spriteObject = game.sprites[player][y]
		$('.stage').off('click', this.spriteStart);
		$('.stage').removeClass('highlighted')
		$('.sprite').off('click', this.selectSprite);

		$('.sprite').removeClass('highlighted');
		game.spriteMove(spriteObject, player);
	},
	listenersOn: function(legalArr, player){
		var selectedSprite = '';
		for (i = 0; i < legalArr.length; i++) {
			var legalSprite = legalArr[i];
			legalSprite.element.on('click', this.selectSprite)
		}
	},
	createSprite: function($sprite, player) {
		return {
			color: player,
			position: 0,
			element: $sprite
		}
	},
	spriteStart: function(){
		$('.stage').off('click', this.spriteStart);
		$('.stage').removeClass('highlighted');
		$('.sprite').off('click', this.selectSprite);
		$('.sprite').removeClass('highlighted');
		var player = game.player[game.turn];
		console.log(game.sprites[player].length + game.endSprites[player].length)
		if ((game.sprites[player].length + game.endSprites[player].length) < 4) {
		var $sprite = $('<div>')
			.attr('pos', 0)
			.addClass(player)
			.addClass('sprite');
			
			var sprite = game.createSprite($sprite, player);
			game.sprites[player].push(sprite);
			console.log(game.sprites);
			var id = player + (game.sprites[player].length -1);
			$sprite.attr('id', id);

			if (player === 'yellow') {
				game.bumpPiece($("#252"));
				$sprite.appendTo("#252");
			}
			if (player === 'green') {
				game.bumpPiece($("#192"));
				$sprite.appendTo("#192");
			}
			if (player === 'red') {
				game.bumpPiece($("#3"));
				$sprite.appendTo("#3")
			}
			if (player === 'blue') {
				game.bumpPiece($("#63"));
				$sprite.appendTo("#63")
			}
		}
		// game.turn = game.turn +1;
	},
	spriteSlideA: function(player, boardPosition){
			for (var i = 0; i < 4; i++) {
			var bumpSquare = "[directionalId = '" + (boardPosition + i).toString() + "']";
			game.bumpPiece($(bumpSquare));
			}
	},
	spriteSlideB: function(player, boardPosition){
			for (var i = 0; i < 5; i++) {
			var bumpSquare = "[directionalId = '" + (boardPosition + i).toString() + "']";
			game.bumpPiece($(bumpSquare));
			}
	},
	spriteEnd: function(sprite, player){
		var strPlayer = "[id ='" + player + "']";
		sprite.element.appendTo($(strPlayer));

		game.sprites[player].splice([spriteIndex], 1);

		var retiredSprite = game.createSprite(player);
		game.endSprites[player].push(retiredSprite);
		// game.turn = game.turn +1;
		game.winCheck(player);

	},
	spriteMove: function(sprite, player){
		console.log(sprite.position)
		sprite.position = sprite.position + game.card;
		var position = sprite.position;
		console.log(position)
		var boardPosition = position + game.playerConstant[player];
		if (boardPosition > 59) {boardPosition = boardPosition - 60;}
		var grab = "[directionalId = '" + boardPosition.toString() + "']";
		if (position >= 65) {
			game.spriteEnd(sprite, player);
		}

		if ($(grab).hasClass('slideStartA') &&! $(grab).hasClass(player)) {
			game.spriteSlideA(sprite, boardPosition);
			sprite.position = sprite.position + 3;
			boardPosition = boardPosition + 3;
			console.log(boardPosition)
			grab = "[directionalId = '" + boardPosition.toString() + "']";
		}
		if ($(grab).hasClass('slideStartB') &&! $(grab).hasClass(player)) {
			game.spriteSlideB(sprite, boardPosition);
			sprite.position = sprite.position + 4;
			boardPosition = boardPosition + 4;
			grab = "[directionalId = '" + boardPosition.toString() + "']";
		}
		if (position >= 60) {
			var safePosition = position - 59;
			var safeGrab = "[safetyID = '" + player.charAt(0) + safePosition.toString() + "'";
			sprite.element.appendTo($(safeGrab));
			// game.turn = game.turn +1;
		}

		else 
			game.bumpPiece($(grab));
			sprite.element.appendTo($(grab))
			

		// game.turn = game.turn +1;
			
		
	},
	exchangeSprites: function(sprite, enemySprite) {
		//LOGIC TO EXCHANGE TWO SPRITE POSITIONS
		//LOGIC TO MAKE START CONDITIONS FOR SORRY CARDX
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
		// 			this.listenersOn(player, legalArr);
		// 			this.spriteMove(sprite, card);
		// 		}

		// 		
		// 		this.nextTurn();
		},
	tenCard: function(player){
		//DETERMINE LEGAL ARRAY
		//PROMPT USER FOR +10 or -1
		if (10 === true) {
			card = 10;
			this.listenersOn(player, legalArr);
			this.spriteMove(sprite, card);
			this.nextTurn();
		}
		if (-1 === true) {
			card = -1;
			this.listenersOn(player, legalArr);
			this.spriteMove(sprite, card);
			this.nextTurn();
		}
	},
	elevenCard: function(player){
		//DETERMINE LEGAL ARRAY
		//PROMPT USER FOR 11 or SWAP
		if (11 === true) {
			card = 11;
			this.listenersOn(player, legalArr);
			this.spriteMove(sprite, card);
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

		var player = this.player[i];
			if (game.card === '2') {
				this.twoCard(player);
			}
			if (game.card === '7') {
				this.sevenCard(player);
			}
			if (game.card === '10') {
				this.tenCard(player);
			}
			if (game.card === '11') {
				this.elevenCard();
			}
			if (game.card === 'sorry') {
				this.sorryCard(player);
			}
			else {
			this.checkLegalMove(player);
				if (legalArr.length === 0) {
					return alert('Sorry! No legal moves!');
				}
				else 
				alert('Choose your piece!');
				this.listenersOn(player, legalArr);
				this.spriteMove(sprite, player);
				this.turn = this.turn + 1;
				if (this.turn > 3) {this.turn = this.turn - 4}
		}
	},
	winCheck: function(player){
		if (this.endSprites[player].length === 4) {
			alert(player + ' WINS!');
		}
	}

}

game.renderBoard();
game.card = 5;
game.spriteStart()
game.spriteMove(game.sprites.yellow[0], 'yellow')
game.spriteMove(game.sprites.yellow[0], 'yellow')
game.spriteStart()
game.card = 1;
game.turn = 1;
game.spriteStart()
game.card = 3;

game.checkLegalMove('yellow')
// game.checkLegalMove('yellow')
// game.card = 3;



topGame = game;


})









