// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Author: @domar95
contract TicTacToe {
    enum GameState {
        NextX,
        NextO,
        WinnerX,
        WinnerO,
        Draw
    }
    GameState private gameState = GameState.NextX;
    uint8[9] private currentBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    event GameStateUpdated(GameState, uint8[9] currentBoard);

    function handlePlay(uint8 index) public {
        require(index < 9, "Index out of bounds");
        require(currentBoard[index] == 0, "Square already filled");
        require(
            gameState == GameState.NextX || gameState == GameState.NextO,
            "Game already ended"
        );

        currentBoard[index] = gameState == GameState.NextX ? 1 : 2;
        updateGameState();
    }

    function resetBoard() public {
        currentBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        gameState = GameState.NextX;

        emit GameStateUpdated(gameState, currentBoard);
    }

    function updateGameState() private {
        uint8 winner = calculateWinner();

        if (winner != 0) {
            gameState = winner == 1 ? GameState.WinnerX : GameState.WinnerO;
        } else if (isDraw()) {
            gameState = GameState.Draw;
        } else {
            gameState = (gameState == GameState.NextX)
                ? GameState.NextO
                : GameState.NextX;
        }

        emit GameStateUpdated(gameState, currentBoard);
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

    function getGameState() public view returns (GameState) {
        return gameState;
    }

    function getCurrentBoard() public view returns (uint8[9] memory) {
        return currentBoard;
    }
}
