(function() {
	'use strict';

	var Ship = require('./ship.js');
	var Board = require('./board.js');

	function Game () {
		var self = this;
		var rules = {
			size: 10,
			ships: [
				'battleship',
				'destroyer',
				'destroyer'
			]
		};
		var board;

		self.drawGrid = function () {
			board = new Board(rules.size);
		};

		self.placeShips = function() {
			rules.ships.forEach(function(type) {
				var ship = new Ship (type);
				var coords = ship.placeOn(board);
				board.addShip(ship, coords);
			});
		};

		self.begin = function(options) {
			self.drawGrid();
			self.placeShips();

			if (options.debug) {
				self.board = board;
			}
		};

		self.guess = function(guess) {
			var alphabet = 'abcdefghij';
			var valid = /^([A-J])(10?|[2-9])$/i;
			var match = guess.match(valid);

			if (!match) {
				console.error('Guess is invalid, should be between "A1"" and "J10"');
				return;
			}

			var coords = {
				x: alphabet.indexOf(match[1].toLowerCase()),
				y: parseInt(match[2], 10) - 1	
			};

			var hitAndSink = board.takeShot(coords);

			if (!hitAndSink) {
				return;
			}

			var playedHasWon = board.ships.reduce(function(allSunk, ship) {
				return allSunk && !ship.isSeaworthy();
			}, true);

			if (playedHasWon) {
				console.warn('YOU WIN');
				return true;
			}
		};
	}

	module.exports = Game;
})();
