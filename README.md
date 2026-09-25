Tic-Tac-Toe
A two-player, browser-based Tic-Tac-Toe game built with HTML, CSS, and vanilla JavaScript. Enter your names, take turns placing your marks, and compete across multiple rounds with a live scoreboard.
Features
- Local two-player gameplay — play with a friend on the same device.
- Custom player names — Player 1 uses X and Player 2 uses O.
- Live scoreboard — track each player's round wins throughout the match.
- Turn indicators — see whose turn it is and which mark they use.
- Win and draw detection — checks rows, columns, diagonals, and a full board.
- Move validation — prevents players from overwriting occupied cells.
- Automatic round progression — starts the next round after a short pause.
- Extended matches — a tied score after round three extends the match to five rounds.
- Dark interface — a CSS Grid board with distinct colors for X and O.
Built With
Technology	Purpose
HTML5	Player setup, scoreboard, and game board
CSS3	Layout, dark theme, grid, and hover effects
JavaScript	Game state, event handling, scoring, and round management


No frameworks, external dependencies, or build tools are required.
Getting Started
1. Clone the repository:
   git clone https://github.com/abbasikhadija/tic-tac-toe-top.git
2. Open the project folder:
   cd tic-tac-toe-top
3. Open index.html in your web browser.
You can also use the Live Server extension in VS Code to serve the project locally.
How to Play
1. Enter both players' names and click Start Game. Blank names default to khadija and Sultan.
2. Player 1 plays as X and starts every round. Player 2 plays as O.
3. Take turns clicking an empty square.
4. Place three matching marks in a row, column, or diagonal to win the round.
5. A round ends in a draw if all nine squares are filled without a winner.
6. Each round win adds one point. Draws add no points.
7. When the match continues, the next round begins automatically after approximately 1.5 seconds.
Match Rules
- The match begins with a three-round format; reaching two wins ends it early.
- If the scores are equal after round three, the match extends to five rounds.
- In the extended format, reaching three wins ends the match early. Otherwise, the higher score after round five wins; equal scores produce a match draw.
See Known Limitations below for an unfinished edge case in the three-round format.
Project Files
File	Description
index.html	Page structure and game controls
style.css	Styling and board layout
script.js	Players, board state, win detection, and match flow


Code Overview
- gameBoard() creates an empty 3 × 3 board using a two-dimensional array.
- player(name) constructs a player with a name, score, turn flag, and mark.
- round(...) handles tile clicks, validates moves, switches players, and reports the round result through a callback.
- boardStateChecker(...) checks the eight possible winning combinations.
- gameManager() connects player setup to the interface and manages scores, round progression, and match results.
The project demonstrates DOM manipulation, event listeners, constructor functions, arrays, callbacks, and state management in plain JavaScript.
Known Limitations
- The Reset Game button is displayed but does not yet have an event handler. Refresh the page to start a new match.
- If round three ends with unequal scores but neither player has two wins (for example, 1–0 after two draws), the match continues beyond the intended three-round limit.
- Scores are stored in memory and are cleared when the page reloads.
- Gameplay currently supports two people sharing one device.
Possible Improvements
- Implement the reset button and correct the three-round ending condition.
- Alternate the starting player between rounds.
- Highlight the winning row, column, or diagonal.
- Add a single-player mode with a computer opponent.
- Save match statistics using local storage.
Author
Khadija Abbasi
