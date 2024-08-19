export const renderGameState = (gameState: BigInt): string => {
  switch (gameState) {
    case BigInt(0):
      return "Waiting for players to join...";
    case BigInt(1):
      return "Next player: X";
    case BigInt(2):
      return "Next player: O";
    case BigInt(3):
      return "Player X wins!";
    case BigInt(4):
      return "Player O wins!";
    case BigInt(5):
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
