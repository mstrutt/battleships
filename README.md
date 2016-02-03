# Battleships

To run this, open `index.html` in browser (doesn't need to be document root or anything fancy).

To play, enter guesses into the textarea in the form "A1" or "J10", and press enter. Threre are three ships plotted on a 10x10 grid, 1 battle ship (5 squares) and 2 destroyers (4 squares each).

The result of your guess will be output to the JavaScript console (Ctrl + Shift + J in most browsers) in the form `HIT` / `MISS` / `SINK` / `YOU WIN`. For convenience I used `console.warn` for positive outcomes to highlight them from the sea of misses.

To see a bit more of the workings (or just to cheat) add `?debug` to the URL to reveal the ships locations on the grid (static representation), this also allows for the guess "auto" to be made, and each square will be guessed in turn until victory.

To restart the game at any time, just refresh your browser window (ships randomly placed each time).
