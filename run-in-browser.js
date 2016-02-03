(function() {
	'use strict';

	var debug = !!window.location.search.match(/debug/);

	var game = new Game();
	game.begin({
		debug: debug
	});

	var con = document.getElementById('console');
	con.addEventListener('keyup', function(e) {
		if (e.keyCode !== 13) {
			return;
		}

		var guess = con.value.trim();
		if (debug && guess === 'auto') {
			guessAll();
		} else {
			game.guess(guess);
		}
		con.value = '';
	});

	function guessAll () {
		var x, y;
		var alpha = 'ABCDEFGHIJ';
		var guess;
		var status;
		for (x = 0; x < 10; x++) {
			for (y = 1; y < 11; y++) {
				guess = alpha[x] + y;
				console.log('Guessing ' + guess);
				status = game.guess(guess);
				if (status) {
					break;
				}
			}
			if (y !== 11) {
				break;
			}
		}
	}

	function displayBoard () {
		var alpha = 'ABCDEFGHIJ';
		var x, y;
		var table = document.createElement('table');
		var row, cell, key;

		row = document.createElement('tr'); 
		for (x = -1; x < 10; x++) {
			key = document.createElement('th');
			key.textContent = alpha[x];
			row.appendChild(key);
		}
		table.appendChild(row);

		for (y = 0; y < 10; y++) {
			row = document.createElement('tr');
			key = document.createElement('th');
			key.textContent = (y + 1);
			row.appendChild(key)
			for(x = 0; x < 10; x++) {
				cell = document.createElement('td');
				cell.textContent = game.board.grid[x][y].shipId;
				row.appendChild(cell);
			}
			table.appendChild(row);
		}

		document.getElementById('board').appendChild(table);
	}

	if (debug) {
		displayBoard();
	}
})();