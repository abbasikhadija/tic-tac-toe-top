function gameBoard(){ // factory for the board
    const gameBoard=[["","",""],
                    ["","",""],
                    ["","",""]];
    return gameBoard;
}
function player(name){ // object for player 
  this.name=name;
  this.turn=false;
  this.score=0;
  this.mark="";

}
function round(player1,player2,board){ // round called in game manager and player and board are created there 
  let emptyTile=9;
  let haveWinner=false; 
  let winner;
  player1.turn=!player2.turn; // logic to turn only one players turn 
  let currentPlayer=player1;  // to have starting player 
  
  while(emptyTile > 0 && !haveWinner){ // loop runns untill we have a tie or a winner it stops only when the bord is full with no winner or a winner 
    turn(board);
    boardStateChecker(board);
    if(haveWinner)break;
    if(currentPlayer===player1)currentPlayer=player2;// after the state checker so have a valid record of winner
    else currentPlayer=player1;


  }
  if(!haveWinner){console.log("this is a tie")}
  function turn(board) {
  let validMove = false;

      while (!validMove) {
        let row = prompt(`${currentPlayer.name}'s turn! Enter row (0-2):`);
        let col = prompt(`${currentPlayer.name}'s turn! Enter col (0-2):`);
      
        // Guard against invalid/taken spots
        if (board[row] && board[row][col] === "") {
          board[row][col] = currentPlayer.mark;
          validMove = true; // Breaks the loop and completes the turn!
        } else {
          console.log("Invalid spot or tile is already taken! Try again.");
        }
      }

  emptyTile--;
  }
  function boardStateChecker(gameBoard){
    // function to keep an eye on the board 
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
        )        {
                    console.log("We have a winner!"+currentPlayer.name);
                    haveWinner=true;
                    currentPlayer.score++;
                    winner=currentPlayer.name;
                  }

  }


}
function gameManager() {
  let player1 = new player("khadija");
  let player2 = new player("Sultan");
  player1.mark = "x";
  player2.mark = "o";

  let currentRound = 1;
  let maxRounds = 3; // Starts as Best of 3
  let matchOver = false;

  console.log(`Starting Tic-Tac-Toe: ${player1.name} vs ${player2.name}`);

  while (currentRound <= maxRounds && !matchOver) {
    console.log(`\n--- ROUND ${currentRound} of ${maxRounds} ---`);
    
    // Create a fresh board for each round
    let board = gameBoard();

    // Play one round (updates scores inside player objects)
    round(player1, player2, board);

    // Display running score
    console.log(`Current Score: ${player1.name}: ${player1.score} | ${player2.name}: ${player2.score}`);

    // Check Best-of-3 conditions
    if (maxRounds === 3) {
      if (player1.score === 2 || player2.score === 2) {
        matchOver = true;
        break;
      }
      
      // If tied after 3 rounds, extend to Best of 5
      if (currentRound === 3 && player1.score === player2.score) {
        console.log("\n>>> Tied after 3 rounds! Extending match to Best of 5! <<<");
        maxRounds = 5;
      }
    }

    // Check Best-of-5 conditions
    if (maxRounds === 5) {
      if (player1.score === 3 || player2.score === 3) {
        matchOver = true;
        break;
      }
    }

    currentRound++;
  }

  // --- Final Match Result ---
  console.log("\n===========================");
  if (player1.score > player2.score) {
    console.log(`🏆 MATCH WINNER: ${player1.name} (${player1.score} - ${player2.score})`);
  } else if (player2.score > player1.score) {
    console.log(`🏆 MATCH WINNER: ${player2.name} (${player2.score} - ${player1.score})`);
  } else {
    console.log(`🤝 THE MATCH IS A DRAW! (${player1.score} - ${player2.score})`);
  }
  console.log("===========================");
}
