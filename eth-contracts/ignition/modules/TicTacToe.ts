import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const TicTacToeModule = buildModule("TicTacToeModule", (m) => {
  const ticTacToe = m.contract("TicTacToe");

  return { ticTacToe };
});

export default TicTacToeModule;
