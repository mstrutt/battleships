(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {
	'use strict';

	function Board (size) {
		var self = this;

		self.grid = [];

		var x, y;
		for (x = 0; x < size; x++) {
			self.grid[x] = [];
			for (y = 0; y < size; y++) {
				self.grid[x][y] = {
					shot: false,
					shipId: null
				};
			}
		}

		self.ships = [];
	}

	Board.prototype.addShip = function(ship, coords) {
		var self = this;

		ship.id = self.ships.length;

		coords.forEach(function(coord) {
			self.grid[coord.x][coord.y].shipId = ship.id;
		});

		self.ships.push(ship);
	};

	Board.prototype.checkBounds = function (coord) {
		var self = this;
		return !!(self.grid[coord.x] || [])[coord.y];
	};

	Board.prototype.takeShot = function(coord) {
		var self = this;
		var square = self.grid[coord.x][coord.y];

		if (square.shot) {
			console.error('This square has already been guessed');
			return;
		}

		square.shot = true;
		if (square.shipId === null) {
			console.log('MISS');
			return;
		}

		console.warn('HIT');
		self.ships[square.shipId].registerHit(coord);
		
		if (self.ships[square.shipId].isSeaworthy()) {
			return;
		}

		console.warn('SINK');
		return true;
	};

	module.exports = Board;
})();

},{}],2:[function(require,module,exports){
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

},{"./board.js":1,"./ship.js":3}],3:[function(require,module,exports){
(function() {
	'use strict';

	function Ship (type) {
		var self = this;
		var sizes = {
			'battleship': 5,
			'destroyer': 4
		};

		self.type = type;
		self.size = sizes[type];
		self.orientation = Math.random() < 0.5 ? 'vertical' : 'horizontal';
		self.hull = [];
	}

	Ship.prototype.placeOn = function(board) {
		var self = this;
		var x = Math.floor(Math.random() * board.grid.length);
		var y = Math.floor(Math.random() * board.grid.length);
		var coords = [];

		var i = 0;
		while (i < self.size) {
			if (!board.checkBounds({x: x, y: y}) || board.grid[x][y].shipId !== null) {
				break;
			}

			coords.push({
				x: x,
				y: y
			});

			self.orientation === 'horizontal' ? x++ : y++;
			i++;
		}

		if (coords.length !== self.size) {
			// Retry for valid positioning
			return self.placeOn(board);
		}

		self.hull = coords.map(function(coord) {
			return {
				location: coord,
				hit: false
			};
		});

		return coords;
	};

	Ship.prototype.registerHit = function(coord) {
		var self = this;
		var index;
		self.hull.some(function(section, i) {
			if (section.location.x === coord.x && section.location.y === coord.y) {
				index = i;
				return true;
			}
			return false;
		});
		self.hull[index].hit = true;
	};

	Ship.prototype.isSeaworthy = function() {
		var self = this;
		return self.hull.some(function(section) {
			return !section.hit;
		});
	};

	module.exports = Ship;
})();

},{}],4:[function(require,module,exports){
window.Game = require('./lib/game.js');
},{"./lib/game.js":2}]},{},[4]);
