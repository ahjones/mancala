var game = (function () {
    var init = function () {
        /*           0                             1          */
        /*           0  1  2  3  4  5  6  7  8  9  0  1  2  3 */
        var board = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0];

        return board;
    };

    var play = function (board, index) {
        var b,
            c = count(board, index),
            i = index,
            p = player(index);

        var next_index = function (index, player) {
            var mancala = [6, 13],
                i = index;

            if ((i+1) % 14 == mancala[(player+1) % 2]) {
                return (i+2) % 14;
            }
            return (i+1)%14;
        };

        b = zero(board, i);
        while (c-- > 0) {
            i = next_index(i, p);
            b = inc(b, i);
        }

        return b;
    };

    var player = function (index) {
        return (index<6) ? 0 : 1;
    };

    var count = function (board, index) {
        return board[index%14];
    };

    var inc = function (board, index) {
       var b = board.slice();
       b[index%14]++;
       return b;
    };

    var zero = function (board, index) {
        var b = board.slice();
        b[index%14] = 0;
        return b;
    };

    return {
        init: init,
        play: play
    };
} ());
