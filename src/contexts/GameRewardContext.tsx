"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface GameRewardContextType {
  hasWonGame: boolean;
  unlockReward: () => void;
  resetReward: () => void;
}

const GameRewardContext = createContext<GameRewardContextType | undefined>(
  undefined
);

export const GameRewardProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [hasWonGame, setHasWonGame] = useState(false);

  const unlockReward = () => {
    setHasWonGame(true);
    // Store in localStorage to persist across sessions
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio-game-won", "true");
    }
  };

  const resetReward = () => {
    setHasWonGame(false);
    if (typeof window !== "undefined") {
      localStorage.removeItem("portfolio-game-won");
    }
  };

  // Check localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasWon = localStorage.getItem("portfolio-game-won") === "true";
      setHasWonGame(hasWon);
    }
  }, []);

  return (
    <GameRewardContext.Provider
      value={{ hasWonGame, unlockReward, resetReward }}
    >
      {children}
    </GameRewardContext.Provider>
  );
};

export const useGameReward = () => {
  const context = useContext(GameRewardContext);
  if (context === undefined) {
    throw new Error("useGameReward must be used within a GameRewardProvider");
  }
  return context;
};
