spriteMove: function(sprite, card, player){
		var stringId = $(sprite).attr('id');
		
		var spriteIndex = parseInt(stringId.charAt(stringId.length - 1));
		this.sprites[player][spriteIndex].position = this.sprites[player][spriteIndex].position + card;

		var position = this.sprites[player][spriteIndex].position;
		console.log(position);

		var boardPosition = this.sprites[player][spriteIndex].position + this.playerConstant[player];
		if (boardPosition > 59) {boardPosition = boardPosition - 60;}
		var grab = "[directionalId = '" + boardPosition.toString() + "']";
		
		if (position >= 65) {
			this.spriteEnd(sprite, player);
		}

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
		if (position >= 60) {
			var safePosition = position - 59;
			var safeGrab = "[safetyID = '" + player.charAt(0) + safePosition.toString() + "'";
			sprite.appendTo($(safeGrab));
		}

		else sprite.appendTo($(grab));


			spriteEnd: function(sprite, player){
		var strPlayer = "[id ='" + player + "']";
		sprite.appendTo($(strPlayer));

		var stringId = $(sprite).attr('id');
		var spriteIndex = parseInt(stringId.charAt(stringId.length - 1));
		this.sprites[player].splice([spriteIndex], 1);

		var retiredSprite = this.createSprite(player);
		this.endSprites[player].push(retiredSprite);
		
		this.winCheck(player);
	},


	
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