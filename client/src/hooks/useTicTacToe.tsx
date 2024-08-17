import { useState, useEffect } from "react";
import { ethers } from "ethers";

import { TIC_TAC_TOE_ABI, TIC_TAC_TOE_ADDRESS } from "../constants/TicTacToe";

const fetchContract = (signer: ethers.Signer) =>
  new ethers.Contract(TIC_TAC_TOE_ADDRESS, TIC_TAC_TOE_ABI, signer);

const useTicTacToe = () => {
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [gameState, setGameState] = useState<BigInt>(BigInt(0));
  const [board, setBoard] = useState<BigInt[]>(Array(9).fill(BigInt(0)));

  useEffect(() => {
    const initialize = async () => {
      if (!window.ethereum) {
        console.error("No Ethereum provider found");
        return;
      }
      const provider: ethers.BrowserProvider = new ethers.BrowserProvider(
        window.ethereum
      );
      const signer: ethers.JsonRpcSigner = await provider.getSigner();
      const contract: ethers.Contract = fetchContract(signer);

      setContract(contract);

      setGameState(await contract.getGameState());
      setBoard(await contract.getCurrentBoard());

      // Listen to game state changes
      contract.on(
        "GameStateUpdated",
        (gameState: BigInt, updatedBoard: BigInt[]) => {
          setGameState(gameState);
          setBoard(updatedBoard);
        }
      );

      return () => {
        // Clean up listeners
        contract.off("GameStateUpdated");
      };
    };

    initialize();
  }, [TIC_TAC_TOE_ABI, TIC_TAC_TOE_ADDRESS]);

  const handlePlay = async (index: number) => {
    if (!contract) return;

    try {
      const tx: ethers.TransactionResponse = await contract.handlePlay(index);
      await tx.wait(); // Wait for the transaction to be confirmed
      console.log("Move made:", index);
    } catch (error: unknown) {
      console.error("Error making move:", error);
    }
  };

  const resetGame = async () => {
    if (!contract) return;

    try {
      const tx: ethers.TransactionResponse = await contract.resetBoard();
      await tx.wait(); // Wait for the transaction to be confirmed
      console.log("Game reset");
    } catch (error: unknown) {
      console.error("Error resetting game:", error);
    }
  };

  return {
    gameState,
    board,
    handlePlay,
    resetGame,
  };
};

export default useTicTacToe;
