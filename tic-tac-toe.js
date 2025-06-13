// Create player
function createPlayer(name, symbol){
    return {name, symbol}
}
const DisplayController = (function(){
    const playerNameForm = document.querySelector('.players');
    playerNameForm.addEventListener('submit', (event) => {
        event.preventDefault();
        // TODO: Get the form data
        const data = new FormData(playerNameForm);
        const playerOneName = data.get("player1");
        const playerTwoName = data.get("player2");

        playerNameForm.classList.add("hide");
        GameController.startGame(GameBoard.board);
    });
    function startGameDisplay(){
            document.querySelector('.border').classList.remove("hide");
            document.querySelector('.game-container').addEventListener('click', handleClick) 
        }
        
        function handleClick(event){
            let target = event.target;
            console.log(target)
            if (!target.classList.contains('cell')){
                return
            }
            
            const moveCode = target.id;
            let moveSuccess = GameController.playerMove(moveCode);
            if (moveSuccess){
                updateBoardDisplay(target, GameController.state.currentPlayer.symbol);
            }

        }


        function updateBoardDisplay(target, symbol){
            target.textContent = symbol;
        }

            
        return {startGameDisplay}
    })();



const GameBoard = (function createBoard(){
    const board = new Array(9).fill(undefined);

    function validatePlayerMove(moveCode){
        if (board[moveCode] !== undefined){
            return false
        }
        else if (Number(moveCode) < 0 || Number(moveCode) >= 9){
            return false
        }
        return true
    }

    function updateBoardCell(cellCode, player){
        board[cellCode] = player.symbol;
        console.log(board) //debug statement
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

    return {updateBoardCell, reset, validatePlayerMove, checkWins}
})();


const GameController = (function createGameboard(){
    const state = {
        gameBoard: GameBoard,
        player1: null,
        player2: null,
        winner: false,
        remainingTurns: 9,
        currentPlayer: null
    }

    function turnSwitcher(){
        if (state.currentPlayer === state.player1){
            state.currentPlayer = state.player2;
        }
        else if (state.currentPlayer === state.player2)
        {
            state.currentPlayer = state.player1;
        }
    }
    
    function playerMove(move){
        if (!state.gameBoard.validatePlayerMove(move)){
            return false
        }
        
        // Checks for winners and remaining turns, then checks whose move it is. 
        if (state.remainingTurns > 0 && state.winner === false){
            state.gameBoard.updateBoardCell(move, state.currentPlayer);
            
            state.remainingTurns--;
        }
        
        // Chwcks for winners
        state.winner = state.gameBoard.checkWins()
        if (state.winner === true){
            console.log(`${state.currentPlayer.name} wins!`);
        }
        else if (state.remainingTurns === 0){
            console.log("It's a tie")
        }
        turnSwitcher();
        return true
    }


    function startGame(board){
        state.player1 = createPlayer("Player1", "X");
        state.player2 = createPlayer("Player2", "O");
        state.currentPlayer = state.player1;
        DisplayController.startGameDisplay();
    }

    return {startGame, playerMove, state}
})();

