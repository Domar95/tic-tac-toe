import { useConnection } from "hooks/ConnectionContext";
import Game from "./tic-tac-toe-game/Game";
import Hero from "./hero/Hero";

export default function MainContent() {
  const { isConnected } = useConnection();

  return <div>{isConnected ? <Game /> : <Hero />}</div>;
}
