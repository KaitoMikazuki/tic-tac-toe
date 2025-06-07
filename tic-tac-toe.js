// Create player
function createPlayer(name, symbol){
    return {name, symbol}
}


const GameBoard = (function createBoard(){
    const board = new Array(9).fill(undefined);

    // if true, valid move
    function validatePlayerMove(cellCode){
        if (board[cellCode] !== undefined){
            return false
        }
        else if (Number(cellCode) < 0 || Number(cellCode) >= 9){
            return false
        }
        return true
    }

    function playerMove(cellCode, player){
        board[cellCode] = player.symbol;
        console.log(board)
        return checkWins();
    }


    // Whenever called, checks 3 conditions for both symbols
    function checkWins(){
        // condition 1: Check horizontally, (0-2, 3-5, 6-8)
        for (let cell = 0; cell < 9; cell += 3){
            if (board[cell] === undefined){
                continue;
            }
            
            else if (board[cell] === board[cell + 1] && board[cell] === board[cell + 2]){
                console.log("condition1 win");
                return true
            }
        }
        
        // condition 2: Checks vertically, (n, n+3, n+6), up to n = 2
        for (let row = 0; row < 3; row++){
            if (board[row] === undefined){
                continue;
            }
            
            else if(board[row] === board[row + 3] && board[row] === board[row + 6]){
                console.log("condition2 win");
                return true
            }
        }
        
        // condition 3: Checks diagonally, (0,4,8) or (2,4,6)
        if (board [0] !== undefined && board[0] === board[4] && board[4] === board[8]){
            console.log("condition3 win");
            return true
        }
        else if (board [2] !== undefined && board[2] === board[4] && board[4] === board[6]){
            console.log("condition3 win");
            return true
        }
        return false
    }
    

    function reset(){
        board.fill(undefined);
    }

    return {playerMove, reset, validatePlayerMove, board}
})();

const board = GameBoard.board

const Game = (function createGameboard(){
    const state = {
        gameBoard: GameBoard,
        player1: null,
        player2: null,
    };

    function startGame(board){
        state.player1 = createPlayer("UserInput1", "X");
        state.player2 = createPlayer("UserInput2", "O");

        let winner = false;
        let playerOneTurn = true;
        let remainingTurns = 9;

        while(remainingTurns > 0 && winner === false){
            // while invalid move, keep asking user
            let move = Number(prompt("What move bru"));
            while (state.gameBoard.validatePlayerMove(move) === false){
                move = Number(prompt("What move bru"));
            }

            if (playerOneTurn){
                winner = state.gameBoard.playerMove(move, state.player1)
                console.log("player one moved")
            }
            else{
                winner = state.gameBoard.playerMove(move, state.player2)
                console.log("player two moved")
            }
            playerOneTurn = !playerOneTurn;
            remainingTurns--;
        }
        if (winner === false){
            console.log("it's a tie!")
        }
        else if (playerOneTurn){
            console.log(`${state.player2.name} wins!`)
        }
        else if(!playerOneTurn){
            console.log(`${state.player1.name} wins!`)
        }
    }

    return {startGame}
})();

Game.startGame(GameBoard.board);
