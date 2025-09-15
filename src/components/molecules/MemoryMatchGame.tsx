"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Typography from "@/components/atoms/Typography";
import Icon from "@/components/atoms/Icon";

type Card = {
  id: number;
  symbol: string;
  isFlipped: boolean;
  isMatched: boolean;
};

const MemoryMatchGame: React.FC<{ onWin: () => void }> = ({ onWin }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

  const symbols = ["🚀", "⚡", "🎯", "💎", "🔥", "⭐", "🎨", "🎮"];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isGameStarted && !gameWon) {
      interval = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isGameStarted, gameWon]);

  const initializeGame = () => {
    const gameCards: Card[] = [];
    symbols.forEach((symbol, index) => {
      // Add two cards for each symbol
      gameCards.push(
        { id: index * 2, symbol, isFlipped: false, isMatched: false },
        { id: index * 2 + 1, symbol, isFlipped: false, isMatched: false }
      );
    });

    // Shuffle cards
    const shuffledCards = gameCards.sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
    setFlippedCards([]);
    setMoves(0);
    setIsGameStarted(true);
    setGameWon(false);
    setTimeElapsed(0);
  };

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length === 2) return;
    if (flippedCards.includes(cardId)) return;
    if (cards.find((card) => card.id === cardId)?.isMatched) return;

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    // Update card flip state
    setCards((prev) =>
      prev.map((card) =>
        card.id === cardId ? { ...card, isFlipped: true } : card
      )
    );

    if (newFlippedCards.length === 2) {
      setMoves((prev) => prev + 1);

      const [firstId, secondId] = newFlippedCards;
      const firstCard = cards.find((card) => card.id === firstId);
      const secondCard = cards.find((card) => card.id === secondId);

      if (firstCard?.symbol === secondCard?.symbol) {
        // Match found
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              newFlippedCards.includes(card.id)
                ? { ...card, isMatched: true }
                : card
            )
          );
          setFlippedCards([]);

          // Check if game is won
          const updatedCards = cards.map((card) =>
            newFlippedCards.includes(card.id)
              ? { ...card, isMatched: true }
              : card
          );

          if (updatedCards.every((card) => card.isMatched)) {
            setGameWon(true);
            setTimeout(() => {
              onWin();
            }, 1500);
          }
        }, 1000);
      } else {
        // No match
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              newFlippedCards.includes(card.id)
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
        }, 1500);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <motion.div
      className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Game Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-lg flex items-center justify-center">
          <Icon name="Zap" size="md" className="text-white" />
        </div>
        <div>
          <Typography variant="h4" className="text-white font-bold">
            🧠 Memory Match
          </Typography>
          <Typography variant="body2" className="text-gray-400">
            Match all pairs to unlock secrets!
          </Typography>
        </div>
      </div>

      {!isGameStarted ? (
        /* Start Game Screen */
        <div className="text-center space-y-8">
          <div className="relative">
            <div className="text-7xl mb-6">🧠</div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-2 -right-2 text-2xl"
            >
              ✨
            </motion.div>
          </div>

          <div className="bg-slate-700/30 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <Typography variant="body1" className="text-gray-300 text-lg mb-4">
              Test your memory with this{" "}
              <span className="text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text font-bold">
                Memory Match
              </span>{" "}
              challenge!
            </Typography>
            <Typography variant="body2" className="text-gray-400 mb-6">
              Flip cards to find matching pairs. Match all 8 pairs to win! 🎯
            </Typography>
            <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
              <div className="text-center">
                <div className="text-2xl mb-2">🎯</div>
                <Typography variant="body2" className="text-gray-400 text-xs">
                  Find Pairs
                </Typography>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">⏱️</div>
                <Typography variant="body2" className="text-gray-400 text-xs">
                  Beat the Clock
                </Typography>
              </div>
            </div>
          </div>

          <motion.button
            className="px-10 py-4 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white rounded-xl font-semibold shadow-2xl hover:shadow-indigo-500/25 transition-all duration-300 text-lg border border-indigo-400/20"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={initializeGame}
          >
            <span className="flex items-center space-x-2">
              <span>🧠</span>
              <span>Start Challenge!</span>
            </span>
          </motion.button>
        </div>
      ) : (
        /* Game Playing Screen */
        <div className="space-y-6">
          {/* Game Stats */}
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-slate-700/30 rounded-lg p-3">
              <div className="text-2xl font-bold text-indigo-400">{moves}</div>
              <div className="text-xs text-gray-400">Moves</div>
            </div>
            <div className="bg-slate-700/30 rounded-lg p-3">
              <div className="text-2xl font-bold text-cyan-400">
                {formatTime(timeElapsed)}
              </div>
              <div className="text-xs text-gray-400">Time</div>
            </div>
          </div>

          {/* Game Board */}
          <div className="flex justify-center">
            <div className="grid grid-cols-4 gap-3 max-w-sm">
              {cards.map((card) => (
                <motion.button
                  key={card.id}
                  className={`w-16 h-16 rounded-xl border-2 transition-all duration-300 relative overflow-hidden ${
                    card.isFlipped || card.isMatched
                      ? "bg-gradient-to-br from-indigo-500/30 to-cyan-500/30 border-indigo-400"
                      : "bg-slate-600/50 border-white/10 hover:bg-slate-500/70 hover:border-indigo-400/50"
                  } ${
                    card.isMatched
                      ? "ring-2 ring-green-400 shadow-lg shadow-green-500/20"
                      : ""
                  }`}
                  onClick={() => handleCardClick(card.id)}
                  whileHover={{ scale: card.isMatched ? 1 : 1.05 }}
                  whileTap={{ scale: card.isMatched ? 1 : 0.95 }}
                  disabled={card.isMatched || flippedCards.length === 2}
                >
                  <AnimatePresence mode="wait">
                    {card.isFlipped || card.isMatched ? (
                      <motion.div
                        key="front"
                        initial={{ rotateY: -90 }}
                        animate={{ rotateY: 0 }}
                        exit={{ rotateY: 90 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 flex items-center justify-center text-2xl"
                      >
                        {card.symbol}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="back"
                        initial={{ rotateY: -90 }}
                        animate={{ rotateY: 0 }}
                        exit={{ rotateY: 90 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 flex items-center justify-center text-xl"
                      >
                        🎴
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Win Message */}
          <AnimatePresence>
            {gameWon && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-center py-4"
              >
                <Typography variant="h4" className="text-white font-bold mb-2">
                  🎉 Amazing Memory!
                </Typography>
                <Typography variant="body2" className="text-green-400 mb-2">
                  🎁 You&apos;ve unlocked my contact details!
                </Typography>
                <Typography variant="body2" className="text-gray-400">
                  Completed in {moves} moves and {formatTime(timeElapsed)}
                </Typography>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Reset Button */}
          {gameWon && (
            <div className="flex justify-center">
              <motion.button
                onClick={initializeGame}
                className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                🔄 Play Again
              </motion.button>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default MemoryMatchGame;
