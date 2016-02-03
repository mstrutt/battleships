function outOfBounds (board, x, y) {
	return !(board[x] || [])[y];
}

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
	var x = Math.floor(Math.random() * board.length);
	var y = Math.floor(Math.random() * board.length);
	var coords = [];

	var i = 0;
	while (i < self.size) {
		if (outOfBounds(board, x, y) || board[x][y].shipId !== null) {
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

function Board (size) {
	var self = this;

	self.grid = [];

	var x = 0;
	var y = 0;
	while (x < size) {
		self.grid[x] = [];
		y = 0;
		while (y < size) {
			self.grid[x][y] = {
				shot: false,
				shipId: null
			};
			y++;
		}
		x++;
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
			var coords = ship.placeOn(board.grid);
			board.addShip(ship, coords);
		});
	};

	self.begin = function(options) {
		self.drawGrid();
		self.placeShips();

		if (options.debug) {
			console.log(board);
			console.table(
				board.grid.map(function (x) {
					return x.map(function(y) {
						return y.shipId;
					});
				})
			)
		}
	};
}