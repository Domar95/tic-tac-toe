import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { renderBoard, renderGameState } from "./ticTacToeUtils";
import useTicTacToe from "hooks/useTicTacToe";

export default function Game() {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [pot, setPot] = useState<number>(0);

  const {
    gameState: contractGameState,
    board: contractBoard,
    pot: contractPot,
    joinGame: contractJoinGame,
    handlePlay: contractHandlePlay,
    resetGame: contractResetGame,
    claimReward: contractClaimReward,
  } = useTicTacToe();

  useEffect(() => {
    setBoard(renderBoard(contractBoard));
  }, [contractGameState]);

  useEffect(() => {
    setPot(Number(contractPot));
  }, [contractPot]);

  async function joinGame() {
    await contractJoinGame(1000000000000000);
  }

  async function makeMove(index: number) {
    await contractHandlePlay(index);
  }

  async function resetGame() {
    await contractResetGame();
  }

  async function claimReward() {
    await contractClaimReward();
  }

  return (
    <Box sx={{ p: 2 }}>
      <Board
        squares={board}
        gameState={renderGameState(contractGameState)}
        onPlay={makeMove}
      />
      <Stack direction="column" spacing={2} marginTop={2}>
        <Button
          variant="contained"
          onClick={() => joinGame()}
          sx={{ width: 100 }}
        >
          Join game
        </Button>
        <Button
          variant="contained"
          onClick={() => resetGame()}
          sx={{ width: 100 }}
        >
          Restart
        </Button>
        <Button
          variant="contained"
          onClick={() => claimReward()}
          sx={{ width: 100 }}
        >
          Claim reward
        </Button>
        <Typography variant="h6">
          Pot: {pot / 1000000000000000000} ETH
        </Typography>
      </Stack>
    </Box>
  );
}

function Square({
  value,
  onSquareClick,
}: {
  value: string | null;
  onSquareClick: () => void;
}) {
  return (
    <Button
      variant="contained"
      onClick={onSquareClick}
      sx={{
        width: 50,
        height: 50,
        borderRadius: 0,
      }}
    >
      {value}
    </Button>
  );
}

function Board({
  squares,
  gameState,
  onPlay,
}: {
  squares: (string | null)[];
  gameState: string;
  onPlay: (index: number) => void;
}) {
  function handleClick(index: number): void {
    onPlay(index);
  }

  return (
    <>
      <h2>{gameState}</h2>
      <div>
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}
