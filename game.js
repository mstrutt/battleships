function Ship () {
	var sizes = {
		'battleship': 5,
		'destroyer': 4
	};

	this.orientation = Math.random() < 0.5 ? 'vertical' : 'horizontal';
	this.hull = [];
}

function Game () {
	var rules = {
		size: 10,
		ships: [
			{
				class: 'battleship',
				count: 1
			}, {
				class: 'destroyer',
				count: 2
			}
		]
	};
	var board;

	this.drawGrid = function () {
		function range (length, value) {
			var i = 0;
			var result = [];
			while (i < length) {
				result[i] = value || i;
				i++;
			}
			return result;
		}

		board = range(rules.size, range(rules.size, {
			shot: false,
			shipId: null 
		}));
	};

	this.begin = function() {
		self.drawGrid();
	};
}