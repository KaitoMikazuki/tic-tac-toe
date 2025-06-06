// Create player
function createPlayer(name, symbol){
    return {name, symbol}
}


const GameBoard = (function createBoard(){
    const board = new Array(9).fill(undefined)

    function playerMove(cellCode, player){
        if (board[cellcode] !== undefined){
            return
        }
        else if (cellCode >= 0 && cellCode < 9){
            board[cellCode] = player.symbol;
        }
        else{
            throw Error("invalid playerMove code");
        }
        checkWins(player);
    }

    
    function checkWins(){
        // condition 1: Checks horizontally (0-2, 3-5, 6-8)
        for (let cell = 0; cell < 9; cell++){
            if (board[cell] === undefined){
                continue;
            }
            
            else if (board[cell] === board[cell + 1] && board[cell] === board[cell + 2]){
                console.log("winHorizontal");
            }
        }
        
        // condition 2: Checks vertically, (n, n+3, n+6), up to n = 2
        for (let row = 0; row < 3; row++){
            if (board[row] === undefined){
                continue;
            }
            
            else if(board[row] === board[row + 3] && board[row] === board[row + 6]){
                
            }
        }
        
        // condition 3: if (0,4,8) or (2,4,6)
        if (board [0] !== undefined && board[0] === board[4] && board[4] === board[8]){
            console.log("winDiagonalLeft");
        }
        else if (board [2] !== undefined && board[2] === board[4] && board[4] === board[6]){
            console.log("winDiagonalRight");
        }
    }
    
    function reset(){
        board.fill(undefined);
    }

    return {playerMove, reset, board}
})();



const Game = (function createGameboard(){
    const state = {
        gameBoard: GameBoard,
        player1: null,
        player2: null,
    };

    function startGame(board){
        state.player1 = createPlayer("UserInput1", "X");
        state.player2 = createPlayer("UserInput2", "O");

        let [ongoingGame, playerOneTurn] = [true, true]
        while (ongoingGame){
            if (playerOneTurn){

            }
        }
    }

    return {startGame}
})();

Game.startGame(GameBoard.board);
