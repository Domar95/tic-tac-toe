// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Author: @domar95
contract TicTacToe {
    enum GameState {
        WaitingForPlayers,
        NextX,
        NextO,
        WinnerX,
        WinnerO,
        Draw
    }
    GameState private gameState = GameState.WaitingForPlayers;
    uint8[9] private currentBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    address private playerX;
    address private playerO;
    uint256 private pot;

    event GameStateUpdated(GameState, uint8[9] currentBoard);
    event PotUpdated(uint256 pot);

    function joinGame() public payable {
        require(
            gameState == GameState.WaitingForPlayers,
            "Game already started"
        );
        require(playerX != msg.sender, "You have already joined");
        require(msg.value >= 1000000000000000, "Minimum stake is 0,001 ETH.");

        if (playerX == address(0)) {
            playerX = msg.sender;
        } else {
            playerO = msg.sender;
            gameState = GameState.NextX;
        }

        pot += msg.value;
        emit GameStateUpdated(gameState, currentBoard);
        emit PotUpdated(pot);
    }

    function handlePlay(uint8 index) public {
        require(
            (gameState == GameState.NextX && msg.sender == playerX) ||
                (gameState == GameState.NextO && msg.sender == playerO),
            "Invalid player or game state"
        );
        require(index < 9, "Index out of bounds");
        require(currentBoard[index] == 0, "Square already filled");

        currentBoard[index] = gameState == GameState.NextX ? 1 : 2;
        updateGameState();
    }

    function claimReward() public {
        require(
            gameState == GameState.WinnerX ||
                gameState == GameState.WinnerO ||
                gameState == GameState.Draw,
            "Game not ended yet"
        );
        require(
            (gameState == GameState.WinnerX && msg.sender == playerX) ||
                (gameState == GameState.WinnerO && msg.sender == playerO) ||
                (gameState == GameState.Draw &&
                    (msg.sender == playerX || msg.sender == playerO)),
            "Only the winner or players in case of draw can claim the reward"
        );

        uint256 reward;
        if (gameState == GameState.Draw) {
            reward = pot / 2;
            pot = 0;
            payable(playerX).transfer(reward);
            payable(playerO).transfer(reward);
        } else {
            reward = pot;
            pot = 0;
            payable(msg.sender).transfer(reward);
        }

        emit PotUpdated(pot);
    }

    function resetBoard() public {
        currentBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        gameState = GameState.WaitingForPlayers;
        playerX = address(0);
        playerO = address(0);
        pot = 0;

        emit GameStateUpdated(gameState, currentBoard);
        emit PotUpdated(pot);
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

    function getPlayerX() public view returns (address) {
        return playerX;
    }

    function getPlayerO() public view returns (address) {
        return playerO;
    }

    function getPot() public view returns (uint256) {
        return pot;
    }
}
