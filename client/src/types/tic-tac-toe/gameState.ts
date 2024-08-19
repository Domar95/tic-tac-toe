export const GameStates = {
  WaitingForPlayers: 0n,
  NextPlayerX: 1n,
  NextPlayerO: 2n,
  PlayerXWins: 3n,
  PlayerOWins: 4n,
  Draw: 5n,
} as const;

export type GameState = (typeof GameStates)[keyof typeof GameStates];
