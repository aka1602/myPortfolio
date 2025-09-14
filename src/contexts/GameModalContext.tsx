"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface GameModalContextType {
  isGameModalOpen: boolean;
  openGameModal: () => void;
  closeGameModal: () => void;
}

const GameModalContext = createContext<GameModalContextType | undefined>(
  undefined
);

export const GameModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isGameModalOpen, setIsGameModalOpen] = useState(false);

  const openGameModal = () => {
    setIsGameModalOpen(true);
    // Prevent body scroll when modal is open
    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
    }
  };

  const closeGameModal = () => {
    setIsGameModalOpen(false);
    // Restore body scroll when modal is closed
    if (typeof document !== "undefined") {
      document.body.style.overflow = "unset";
    }
  };

  return (
    <GameModalContext.Provider
      value={{ isGameModalOpen, openGameModal, closeGameModal }}
    >
      {children}
    </GameModalContext.Provider>
  );
};

export const useGameModal = () => {
  const context = useContext(GameModalContext);
  if (context === undefined) {
    throw new Error("useGameModal must be used within a GameModalProvider");
  }
  return context;
};
