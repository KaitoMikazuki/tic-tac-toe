// Create player
function createPlayer(name, symbol){
    return {name, symbol}
}


const GameBoard = (function createBoard(){
    const board = new Array(9).fill(undefined)

    function playerMove(code, playerSymbol){
        if (code >= 0 && code < 9){
            board[code] = playerSymbol;
        }
        else{
            throw Error("invalid playerMove code");
        }
    }

    function reset(){
        board.fill(undefined);
    }

    function checkWins(){
        // condition 1: Checks for 3 symbols in a row (0-2, 3-5, 6-8)
        for (let cell = 1; cell < 10; cell ++){
            if (board[cell] === undefined){
                return
            }

            else if (board[cell] === board[cell + 1] && board[cell]=== board[cell + 2]){
                console.log("win");
            }
        }

        // condition 2: if any n, n+3, n+6 (n should be 0-2)
        for (let row = 0; row < 3; row++){
            if (board[row] === undefined){
                return
            }

            else if(board[row] === board[row + 3] && board[row] === board[row + 6]){
                console.log("win");
            }
        }

        // condition 3: if (0,5,8) or (2,4,6)
        if (board[0] === board[5] && board[5] === board[8]){
            console.log(win);
        }
        else if (board[2] === board[4] && board[4] === board[6]){
            console.log(win);
        }
    }

    return {playerMove, reset}
})();


const Game = (function createGameboard(){
    const state = {
        gameBoard: GameBoard,
        player1: null,
        player2: null,
    };


    function startGame(){
        state.player1 = createPlayer("UserInput1", "X");
        state.player2 = createPlayer("UserInput1", "O");
    }

    return {startGame}
})();

Game.startGame();
