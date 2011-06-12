var game = (function () {
    var init = function () {
        /*    12 11 10 9  8  7         PLAYER 1               */
        /* 13                  6                              */
        /*    0  1  2  3  4  5         PLAYER 0               */
        /*  ^                  ^                              */
        /*  |                  +----   Mancala for player 0   */
        /*  |                                                 */
        /*  +-----------------------   Mancala for player 1   */

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

        if (count(b,i) == 1 && is_players_hole(i,p)) {
            b = inc(b, players_mancala(p), 1 + count(b, opposite(i)));
            b = zero(b, i);
            b = zero(b, opposite(i));
        }

        return b;
    };

    var is_players_hole = function (index, player) {
        if (player == 0) {
            return (index<6);
        } else {
            return ((index>6) && (index != 13));
        }
    };
    
    var is_mancala = function (index) {
        return (index == 6) || (index == 13);
    };

    var players_mancala = function (player) {
        return [6,13][player];
    };

    var opposite = function (index) {
        if (index == 6) {
            return 13;
        } else if (index == 13) {
            return 6;
        } else {
            return 12 - index;
        }
    };

    var player = function (index) {
        return (index<6) ? 0 : 1;
    };

    var count = function (board, index) {
        return board[index%14];
    };

    var inc = function (board, index, amount) {
        amount = amount || 1;
        var b = board.slice();
        b[index%14]+=amount;
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
