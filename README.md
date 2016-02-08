# Battleships

[ ![Codeship Status for mstrutt/battleships](https://codeship.com/projects/7cf1e510-b0de-0133-dc8f-3674ea8aa855/status?branch=master)](https://codeship.com/projects/132836)

To run this, open `index.html` in browser (doesn't need to be document root or anything fancy).

To play, enter guesses into the textarea in the form "A1" or "J10", and press enter. Threre are three ships plotted on a 10x10 grid, 1 battle ship (5 squares) and 2 destroyers (4 squares each).

The result of your guess will be output to the JavaScript console (Ctrl + Shift + J in most browsers) in the form `HIT` / `MISS` / `SINK` / `YOU WIN`. For convenience I used `console.warn` for positive outcomes to highlight them from the sea of misses.

To see a bit more of the workings (or just to cheat) add `?debug` to the URL to reveal the ships locations on the grid (static representation), this also allows for the guess "auto" to be made, and each square will be guessed in turn until victory.

To restart the game at any time, just refresh your browser window (ships randomly placed each time).

## Build

For the browser, the app has been bundled up using browserify, with a simple wrapper to expose `Game` to the window. To rebuild at any time, use `npm run build`
