// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Author: @domar95
contract TicTacToe {
    uint8[9] private currentBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    // gameState: 0 = next X, 1 = next Y, 2 = winner X, 3 = winner Y, 4 = draw
    uint8 public gameState = 0;
    uint8 public currentMove = 0;

    function handlePlay(uint8 index) public {
        require(index < 9, "Index out of bounds");
        require(currentBoard[index] == 0, "Square already filled");
        require(calculateWinner() == 0, "Game already won");
        require(!isDraw(), "Game ended with draw");

        currentBoard[index] = xIsNext() ? 1 : 2;
        currentMove++;
        updateGameState();
    }

    function resetBoard() public {
        currentBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        gameState = 0;
        currentMove = 0;
    }

    function updateGameState() private {
        uint8 winner = calculateWinner();

        if (winner != 0) {
            gameState = winner == 1 ? 2 : 3;
        } else if (isDraw()) {
            gameState = 4;
        } else {
            gameState = xIsNext() ? 0 : 1;
        }
    }

    function calculateWinner() private view returns (uint8) {
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
                currentBoard[a] != 0 &&
                currentBoard[a] == currentBoard[b] &&
                currentBoard[a] == currentBoard[c]
            ) {
                return currentBoard[a];
            }
        }
        return 0;
    }

    function isDraw() private view returns (bool) {
        for (uint8 i = 0; i < 9; i++) {
            if (currentBoard[i] == 0) {
                return false;
            }
        }
        return true;
    }

    function xIsNext() private view returns (bool) {
        return currentMove % 2 == 0;
    }

    function getCurrentBoard() public view returns (uint8[9] memory) {
        return currentBoard;
    }
}
