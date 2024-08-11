// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Author: @domar95
contract TicTacToe {
    uint8[9][] public history;
    uint8 public currentMove;
    bool public xIsNext;
    string public state;

    constructor() {
        history.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
        currentMove = 0;
        xIsNext = true;
    }

    function handlePlay(uint8 index) public returns (string memory) {
        require(index < 9, "Index out of bounds");
        require(history[currentMove][index] == 0, "Square already filled");
        require(calculateWinner(history[currentMove]) == 0, "Game already won");
        require(isDraw(history[currentMove]) == false, "Game ended with draw");

        uint8[9] memory nextSquares = history[currentMove];
        nextSquares[index] = xIsNext ? 1 : 2;
        history.push(nextSquares);
        currentMove++;
        xIsNext = !xIsNext;

        return getState();
    }

    function calculateWinner(
        uint8[9] memory squares
    ) public pure returns (uint8) {
        uint8[3][8] memory winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (uint8 i = 0; i < 8; i++) {
            uint8 a = winningCombinations[i][0];
            uint8 b = winningCombinations[i][1];
            uint8 c = winningCombinations[i][2];
            if (
                squares[a] != 0 &&
                squares[a] == squares[b] &&
                squares[a] == squares[c]
            ) {
                return squares[a];
            }
        }
        return 0;
    }

    function isDraw(uint8[9] memory squares) public pure returns (bool) {
        for (uint8 i = 0; i < 9; i++) {
            if (squares[i] == 0) {
                return false;
            }
        }
        return true;
    }

    function getCurrentSquares() public view returns (uint8[9] memory) {
        return history[currentMove];
    }

    function getHistory() public view returns (uint8[9][] memory) {
        return history;
    }

    function getState() public view returns (string memory) {
        uint8 winner = calculateWinner(history[currentMove]);

        if (winner == 1) return "Winner: X";
        if (winner == 2) return "Winner: Y";
        if (isDraw(history[currentMove])) return "Draw";
        if (xIsNext) return "Next player: X";
        return "Next player: Y";
    }
}
