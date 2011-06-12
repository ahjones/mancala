var play_game = function (game) {
    var board;

    var init = function () {
        board = game.init();
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
