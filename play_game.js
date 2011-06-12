var play_game = function (game) {
    var board;

    var init = function () {
        board = game.init(show_turn);
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
