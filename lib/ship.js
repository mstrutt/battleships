(function() {
	'use strict';

	function Ship (type) {
		var self = this;
		var sizes = {
			battleship: 5,
			destroyer: 4
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
