import { GameState, GameStates } from "types/tic-tac-toe/gameState";

export const renderGameState = (gameState: GameState): string => {
  switch (gameState) {
    case GameStates.WaitingForPlayers:
      return "Waiting for players to join...";
    case GameStates.NextPlayerX:
      return "Next player: X";
    case GameStates.NextPlayerO:
      return "Next player: O";
    case GameStates.PlayerXWins:
      return "Player X wins!";
    case GameStates.PlayerOWins:
      return "Player O wins!";
    case GameStates.Draw:
      return "It's a draw!";
    default:
      return "Unknown game state";
  }
};

export const renderBoard = (array: bigint[]): (string | null)[] => {
  return array.map((number: bigint) =>
    number === BigInt(1) ? "X" : number === BigInt(2) ? "O" : null
  );
};
