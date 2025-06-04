// Create player
function createPlayer(name, symbol){
    return {name, symbol}
}

const gameBoard = (function createBoard(){
    const board = new Array(9).fill(undefined)

    function playerMove(code, playerSymbol){
        if (code >= 0 || code < 9){
            board[code] = playerSymbol
        }
        else{
            throw Error("invalid playerMove code")
        }
    }

    function reset(){
        board.fill(undefined)
    }
})();

const Game = (function createGameboard(){
    const state = {
        gameBoard: gameBoard,
        player1: null,
        player2: null,
    };
    
    function startGame(){
        state.player1 = createPlayer("UserInput1", "X");
        state.player2 = createPlayer("UserInput1", "O");
    }
    return {}
})();

