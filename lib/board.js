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

	Board.prototype.checkBounds = function(coord) {
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
