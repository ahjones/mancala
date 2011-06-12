var game = (function () {
    var init = function () {
        /*           0                             1          */
        /*           0  1  2  3  4  5  6  7  8  9  0  1  2  3 */
        var board = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0];

        return board;
    };

    var play = function (board, index) {
        var b = board.slice(),
            c = b[index],
            i = index,
            skip;

        if (index < 6) {
            skip = 13;
        } else {
            skip = 6;
        }

        b[index] = 0;
        while (c > 0) {
            if (++i == skip) {
                ++i;
            }

            b[i%14]++;
            c--;
        }

        return b;
    };

    return {
        init: init,
        play: play
    };
} ());
