import { useState, useEffect } from "react";
import { ethers } from "ethers";

import { TIC_TAC_TOE_ABI, TIC_TAC_TOE_ADDRESS } from "../constants/TicTacToe";

const fetchContract = (signer: ethers.Signer) =>
  new ethers.Contract(TIC_TAC_TOE_ADDRESS, TIC_TAC_TOE_ABI, signer);

const useTicTacToe = () => {
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [gameState, setGameState] = useState<BigInt>(BigInt(0));
  const [board, setBoard] = useState<BigInt[]>(Array(9).fill(BigInt(0)));
  const [pot, setPot] = useState<BigInt>(BigInt(0));

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

      const handleGameStateUpdated = (
        gameState: BigInt,
        updatedBoard: BigInt[]
      ) => {
        setGameState(gameState);
        setBoard(updatedBoard);
      };

      const handlePotUpdated = (pot: BigInt) => {
        setPot(pot);
      };

      // Fetch initial states
      const initialGameState: BigInt = await contract.getGameState();
      const initialBoard: BigInt[] = await contract.getCurrentBoard();
      handleGameStateUpdated(initialGameState, initialBoard);
      const initialPot: BigInt = await contract.getPot();
      handlePotUpdated(initialPot);

      // Listen to state changes
      contract.on("GameStateUpdated", handleGameStateUpdated);
      contract.on("PotUpdated", handlePotUpdated);

      return () => {
        // Clean up listeners
        contract.removeAllListeners();
      };
    };

    initialize();
  }, [TIC_TAC_TOE_ABI, TIC_TAC_TOE_ADDRESS]);

  const joinGame = async (stake: number) => {
    if (!contract) return;

    try {
      const tx: ethers.TransactionResponse = await contract.joinGame({
        value: stake,
      });
      await tx.wait(); // Wait for the transaction to be confirmed
      console.log("Joined game with stake:", stake);
    } catch (error: unknown) {
      console.error("Error joining game:", error);
    }
  };

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

  const claimReward = async () => {
    if (!contract) return;

    try {
      const tx: ethers.TransactionResponse = await contract.claimReward();
      await tx.wait(); // Wait for the transaction to be confirmed
      console.log("Claimed reward");
    } catch (error: unknown) {
      console.error("Error claiming reward:", error);
    }
  };

  return {
    gameState,
    board,
    pot,
    joinGame,
    handlePlay,
    resetGame,
    claimReward,
  };
};

export default useTicTacToe;
