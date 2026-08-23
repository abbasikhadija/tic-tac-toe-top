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
function round(player1,player2,board){
  let emptyTile=9;
  let haveWinner=false;
  let winner;
  player1.turn=!player2.turn; // logic to turn only one players turn 
  let currentPlayer=player1;  // to have starting player 
  
  while(emptyTile > 0 && !haveWinner){ // loop runns untill we have a tie or a winner it stops only when the bord is full with no winner or a winner 
    turn(currentPlayer,board);
    boardStateChecker(board);
    if(haveWinner)break;
    if(currentPlayer===player1)currentPlayer=player2;// after the state checker so have a valid record of winner
    else currentPlayer=player1;


  }
  if(!haveWinner){console.log("this is a tie")}
  function turn(currentPlayer,board){
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
function gameManager(){
  let player1= new player("khadija");
  let player2= new player("Sultan");
  player1.mark="x";
  player2.mark="o";
  let board= gameBoard();
  // place the logic of tie and best of three or best of five 
  round(player1,player2,board);

}

