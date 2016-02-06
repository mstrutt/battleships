describe('BattleshipsGame', function() {
	var game;
	var output = {};

	['log', 'warn', 'error'].forEach(function(level) {
		console[level] = function(value) {
			output[level].push(value);
		}
	});

	describe('a set board', function() {
		beforeEach(function() {
			output.log = [];
			output.warn = [];
			output.error = [];

			game = new Game();
			game.begin({
				debug: true
			});
			game.board.grid = setGrid();
			setShips().forEach(function(ship, i) {
				game.board.ships[i].orientation = ship.orientation;
				game.board.ships[i].hull = ship.hull;
			});
		});

		it('misses at A1', function() {
			game.guess('A1');
			expect(output.log).toEqual(['MISS']);
		});

		it('hits at B7', function() {
			game.guess('B7');
			expect(output.log).toEqual([]);
			expect(output.warn).toEqual(['HIT']);
		});

		it('reports a sinking', function() {
			game.guess('B7');
			game.guess('C7');
			game.guess('D7');
			game.guess('E7');
			game.guess('F7');
			expect(output.log).toEqual([]);
			expect(output.warn).toEqual([
				'HIT',
				'HIT',
				'HIT',
				'HIT',
				'HIT',
				'SINK'
			]);
		});

		it('logs an error on repeat guesses', function() {
			game.guess('A1');
			game.guess('A1');
			expect(output.error).toEqual(['This square has already been guessed']);
		});

		it('wins once all ships are sunk', function() {
			// Battleship
			game.guess('B7');
			game.guess('C7');
			game.guess('D7');
			game.guess('E7');
			game.guess('F7');

			// Destroyer 1
			game.guess('F5');
			game.guess('G5');
			game.guess('H5');
			game.guess('I5');

			// Destroyer 2
			game.guess('H6');
			game.guess('H7');
			game.guess('H8');
			game.guess('H9');

			expect(output.log).toEqual([]);
			expect(output.error).toEqual([]);
			expect(output.warn[output.warn.length - 1]).toBe('YOU WIN');

		})
	});
});
