// --- Your original constructors ---
function gameBoard(){
    const gameBoard=[["","",""],
                    ["","",""],
                    ["","",""]];
    return gameBoard;
}

function player(name){
  this.name=name;
  this.turn=false;
  this.score=0;
  this.mark="";
}

// --- DOM Connected Round Logic ---
function round(player1, player2, board, onRoundEnd) {
  let emptyTile = 9;
  let haveWinner = false;
  let winner;
  
  player1.turn = true;
  player2.turn = false;
  let currentPlayer = player1;  

  // Get UI elements
  const statusMessage = document.getElementById("status-message");
  const tiles = document.querySelectorAll(".tile");

  // Initial turn text
  statusMessage.textContent = `${currentPlayer.name}'s (${currentPlayer.mark}) Turn`;

  // Attach click events to the HTML tiles
  tiles.forEach(tile => {
    tile.addEventListener("click", handleTileClick);
  });

  function handleTileClick(event) {
    if (haveWinner) return;

    // Get position from HTML data attributes
    let row = parseInt(event.target.getAttribute("data-row"));
    let col = parseInt(event.target.getAttribute("data-col"));

    // Guard clause: check if tile is taken
    if (board[row][col] !== "") {
      statusMessage.textContent = "Tile is not empty! Pick another spot.";
      return;
    }

    // Update board state & HTML UI
    board[row][col] = currentPlayer.mark;
    event.target.textContent = currentPlayer.mark;
    if (currentPlayer.mark === "x") event.target.classList.add("x-mark");
    if (currentPlayer.mark === "o") event.target.classList.add("o-mark");

    emptyTile--;

    // Check for win condition
    boardStateChecker(board);

    if (haveWinner) {
      // Cleanup tile listeners for this round
      tiles.forEach(t => t.removeEventListener("click", handleTileClick));
      onRoundEnd(winner);
      return;
    }

    if (emptyTile === 0) {
      statusMessage.textContent = "This is a tie!";
      tiles.forEach(t => t.removeEventListener("click", handleTileClick));
      onRoundEnd(null);
      return;
    }

    // Swap players after turn
    if (currentPlayer === player1) currentPlayer = player2;
    else currentPlayer = player1;

    statusMessage.textContent = `${currentPlayer.name}'s (${currentPlayer.mark}) Turn`;
  }

  function boardStateChecker(gameBoard) {
    if (
       // Rows
       (gameBoard[0][0] !== "" && gameBoard[0][0] === gameBoard[0][1] && gameBoard[0][1] === gameBoard[0][2]) ||
       (gameBoard[1][0] !== "" && gameBoard[1][0] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[1][2]) ||
       (gameBoard[2][0] !== "" && gameBoard[2][0] === gameBoard[2][1] && gameBoard[2][1] === gameBoard[2][2]) ||

       // Columns
       (gameBoard[0][0] !== "" && gameBoard[0][0] === gameBoard[1][0] && gameBoard[1][0] === gameBoard[2][0]) ||
       (gameBoard[0][1] !== "" && gameBoard[0][1] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][1]) ||
       (gameBoard[0][2] !== "" && gameBoard[0][2] === gameBoard[1][2] && gameBoard[1][2] === gameBoard[2][2]) ||

       // Diagonals
       (gameBoard[0][0] !== "" && gameBoard[0][0] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][2]) ||
       (gameBoard[2][0] !== "" && gameBoard[2][0] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[0][2])
      ) {
        statusMessage.textContent = "We have a winner! " + currentPlayer.name;
        haveWinner = true;
        currentPlayer.score++;
        winner = currentPlayer;
      }
  }
}

// --- Dynamic Best-of-3 / Best-of-5 Game Manager ---
function gameManager() {
  const setupScreen = document.getElementById("player-setup");
  const gameScreen = document.getElementById("game-screen");
  const startBtn = document.getElementById("start-btn");

  const p1NameInput = document.getElementById("player1-name");
  const p2NameInput = document.getElementById("player2-name");
  const p1DisplayName = document.getElementById("p1-display-name");
  const p2DisplayName = document.getElementById("p2-display-name");
  const p1ScoreDisplay = document.getElementById("p1-score");
  const p2ScoreDisplay = document.getElementById("p2-score");
  const roundInfo = document.getElementById("round-info");

  startBtn.addEventListener("click", () => {
    let name1 = p1NameInput.value.trim() || "khadija";
    let name2 = p2NameInput.value.trim() || "Sultan";

    let player1 = new player(name1);
    let player2 = new player(name2);
    player1.mark = "x";
    player2.mark = "o";

    p1DisplayName.textContent = player1.name;
    p2DisplayName.textContent = player2.name;

    setupScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");

    let currentRound = 1;
    let maxRounds = 3;

    function playNextRound() {
      // Clear board display in HTML
      document.querySelectorAll(".tile").forEach(t => {
        t.textContent = "";
        t.classList.remove("x-mark", "o-mark");
      });

      p1ScoreDisplay.textContent = player1.score;
      p2ScoreDisplay.textContent = player2.score;
      roundInfo.textContent = `Round ${currentRound} of ${maxRounds}`;

      let board = gameBoard();

      // Start round with a callback to process results when a round completes
      round(player1, player2, board, (winner) => {
        p1ScoreDisplay.textContent = player1.score;
        p2ScoreDisplay.textContent = player2.score;

        // Best-of-3 logic
        if (maxRounds === 3) {
          if (player1.score === 2 || player2.score === 2) {
            declareWinner(player1.score === 2 ? player1 : player2);
            return;
          }
          if (currentRound === 3 && player1.score === player2.score) {
            maxRounds = 5;
            document.getElementById("status-message").textContent += " Tied! Extended to Best of 5!";
          }
        }

        // Best-of-5 logic
        if (maxRounds === 5) {
          if (player1.score === 3 || player2.score === 3) {
            declareWinner(player1.score === 3 ? player1 : player2);
            return;
          }
          if (currentRound === 5) {
            if (player1.score > player2.score) declareWinner(player1);
            else if (player2.score > player1.score) declareWinner(player2);
            else declareWinner(null);
            return;
          }
        }

        currentRound++;
        setTimeout(playNextRound, 1500);
      });
    }

    function declareWinner(finalWinner) {
      const statusMessage = document.getElementById("status-message");
      if (finalWinner) {
        statusMessage.textContent = `🏆 MATCH WINNER: ${finalWinner.name}!`;
      } else {
        statusMessage.textContent = "🤝 THE MATCH IS A TIE!";
      }
    }

    playNextRound();
  });
}

// Start game listener on page load
document.addEventListener("DOMContentLoaded", gameManager);