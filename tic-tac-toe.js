function createPlayer(name, symbol){
    return {name, symbol}
}


const DisplayController = (function(){
    let clickTarget;

    // Adds submit listener then acquires form data to pass as parameters
    const playerNameForm = document.querySelector('.players');
    playerNameForm.addEventListener('submit', (event) => {
        event.preventDefault();
        // NOTE: User input is not validated and can be unsafe at this point
        const data = new FormData(playerNameForm);
        const playerOneName = data.get("player1");
        const playerTwoName = data.get("player2");

        playerNameForm.classList.add("hide");
        GameController.startGame(playerOneName, playerTwoName);
    });

    document.getElementById('restart').addEventListener('click', () => location.reload());





    function startGameDisplay(){
            document.querySelector('main').classList.remove("hide");
            document.querySelector('.game-container').addEventListener('click', handleClick) 
        }
        

    function handleClick(event){
        clickTarget = event.target;
        console.log(clickTarget)
        if (!clickTarget.classList.contains('cell')){
            return
        }
        
        const moveCode = clickTarget.id;
        GameController.playerMove(moveCode);

    }

    function updateBoardDisplay(symbol){
        clickTarget.textContent = symbol;
    }

    function declareWinner(winner){
        winnerDeclaration = document.getElementById("winner")
        if (winner === null){
            winnerDeclaration.textContent = "It's a tie!"
        }
        else{
            winnerDeclaration.textContent = `${winner} wins!`
        }
        document.getElementById("restart").textContent = "Play again?"
    }

    return {startGameDisplay, updateBoardDisplay, declareWinner}
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
            DisplayController.declareWinner(state.currentPlayer.name);
        }
        else if (state.remainingTurns === 0){
            DisplayController.declareWinner(null);
        }

        DisplayController.updateBoardDisplay(state.currentPlayer.symbol);
        turnSwitcher();
        return true
    }


    function startGame(player1, player2){
        state.player1 = createPlayer(player1, "X");
        state.player2 = createPlayer(player2, "O");
        state.currentPlayer = state.player1;
        DisplayController.startGameDisplay();
    }

    return {startGame, playerMove, state}
})();

