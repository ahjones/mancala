var game = (function () {
    var NUM_HOLES = 14,
        NUM_PLAYERS = 2,
        P0_MANCALA = 6,
        P1_MANCALA = 13;

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
            var mancala = [P0_MANCALA, P1_MANCALA],
                i = index;

            if ((i+1) % NUM_HOLES == mancala[(player+1) % NUM_PLAYERS]) {
                return (i+2) % NUM_HOLES;
            }
            return (i+1) % NUM_HOLES;
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
            return (index<P0_MANCALA);
        } else {
            return ((index>P0_MANCALA) && (index != P1_MANCALA));
        }
    };
    
    var is_mancala = function (index) {
        return (index == P0_MANCALA) || (index == P1_MANCALA);
    };

    var players_mancala = function (player) {
        return [P0_MANCALA,P1_MANCALA][player];
    };

    var opposite = function (index) {
        if (index == P0_MANCALA) {
            return P1_MANCALA;
        } else if (index == P1_MANCALA) {
            return P0_MANCALA;
        } else {
            return 12 - index;
        }
    };

    var player = function (index) {
        return (index<P0_MANCALA) ? 0 : 1;
    };

    var count = function (board, index) {
        return board[index%NUM_HOLES];
    };

    var inc = function (board, index, amount) {
        amount = amount || 1;
        var b = board.slice();
        b[index%NUM_HOLES]+=amount;
        return b;
    };

    var zero = function (board, index) {
        var b = board.slice();
        b[index%NUM_HOLES] = 0;
        return b;
    };

    return {
        init: init,
        play: play
    };
} ());
