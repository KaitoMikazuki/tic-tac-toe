// Create player
function createPlayer(name, symbol){
    return {name, symbol}
}

const gameBoard = (function createBoard(){
    const board = new Array(9).fill(undefined)


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

