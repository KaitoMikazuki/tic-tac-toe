// Create player
function createPlayer(name, symbol){
    return {name, symbol}
}
const DisplayController = (function(){
        document.querySelector('game-container').addEventListener('click', (event) => {
            if (event.target.classList.contains('box')){
                // acquire the id/value so we know what cell to chage
                // changeCellContent(event.target);
                // how to know what symbol
            })
        }) 

    //     function changeCellContent(cell){
    //         cell.children[0].textContent = ;
    //     }
    // })();

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

    function changeBoardCell(cellCode, player){
        board[cellCode] = player.symbol;
        console.log(board)
    }

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

    return {changeBoardCell, reset, validatePlayerMove, checkWins, board}
})();

const board = GameBoard.board

const GameController = (function createGameboard(){
    const state = {
        gameBoard: GameBoard,
        player1: null,
        player2: null,
        winner: false,
        remainingTurns: 9,
        playerOneTurn: true
    };

    function declareWinner(){
        // Last move was player 2
        if (state.playerOneTurn){
            console.log(`${state.player2.name} wins!`)
        }

        // Last move was player 1
        else if(!state.playerOneTurn){
            console.log(`${state.player1.name} wins!`)
        }  
    }

    function playerMove(){
        // Checks for winners and remaining turns, then checks whose turn it is. 
        if (state.remainingTurns > 0 && state.winner === false){
            state.playerOneTurn
                ? state.gameBoard.changeBoardCell(move, state.player1) 
                : state.gameBoard.changeBoardCell(move, state.player2);

                remainingTurns--;
                state.playerOneTurn = !state.playerOneTurn
        }

        if (state.gameBoard.checkWins() === true){
            declareWinner();
        }
        else if (state.remainingTurns === 0){
            console.log("It's a tie")
        }
    }

    function startGame(board){
        state.player1 = createPlayer("UserInput1", "X");
        state.player2 = createPlayer("UserInput2", "O");
        
    }

    return {startGame, playerMove}
})();

GameController.startGame(GameBoard.board);
