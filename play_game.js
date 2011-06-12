var play_game = function (game) {
    var board;

    var init = function () {
        board = game.init(show_turn, show_winner);
        for (var i in board) {
            c(i).onclick = click;
        }
        
        show();
    };

    var show = function () {
        for (var i in board) {
            c(i).innerHTML = board[i];
        }
    };

    var click = function () {
        board = game.play(board, parseInt(this.id.replace("cell", "")));
        show();
    };

    var show_turn = function (player) {
       g("turn").innerHTML = "Player " + player + "'s turn"; 
    };

    var show_winner = function (result) {
        g("turn").innerHTML = "GAME OVER";
        g("results").innerHTML = "P0: " + result.result[0] + "; P1: " + result.result[1] + ".";
    };

    var c = function (index) {
        return g("cell" + index);
    };

    var g = function (id) {
        return document.getElementById(id);
    };

    return {
        init: init
    };
};
