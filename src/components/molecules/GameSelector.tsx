"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Typography from "@/components/atoms/Typography";
import Icon from "@/components/atoms/Icon";
import NumberGuessingGame from "./NumberGuessingGame";
import RockPaperScissorsGame from "./RockPaperScissorsGame";
import TicTacToeGame from "./TicTacToeGame";
import MemoryMatchGame from "./MemoryMatchGame";
import ColorMatchGame from "./ColorMatchGame";
import ReactionTimeGame from "./ReactionTimeGame";

type GameType =
  | "number"
  | "rps"
  | "tictactoe"
  | "memory"
  | "color"
  | "reaction"
  | null;

const GameSelector: React.FC<{ onWin: () => void }> = ({ onWin }) => {
  const [selectedGame, setSelectedGame] = useState<GameType>(null);

  const games = [
    {
      id: "number" as GameType,
      title: "🎯 Number Guessing",
      description: "Can you read my mind?",
      icon: "Target",
      gradient: "from-green-500 to-blue-500",
    },
    {
      id: "rps" as GameType,
      title: "🪨📄✂️ Rock Paper Scissors",
      description: "Classic battle of wits!",
      icon: "Zap",
      gradient: "from-red-500 to-orange-500",
    },
    {
      id: "tictactoe" as GameType,
      title: "🎯 Tic Tac Toe",
      description: "Beat the AI strategist!",
      icon: "Zap",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: "memory" as GameType,
      title: "🧠 Memory Match",
      description: "Test your memory skills!",
      icon: "Zap",
      gradient: "from-indigo-500 to-cyan-500",
    },
    {
      id: "color" as GameType,
      title: "🎨 Color Match",
      description: "Match colors with names!",
      icon: "Zap",
      gradient: "from-pink-500 to-rose-500",
    },
    {
      id: "reaction" as GameType,
      title: "⚡ Reaction Time",
      description: "Test your reflexes!",
      icon: "Zap",
      gradient: "from-yellow-500 to-orange-500",
    },
  ];

  if (selectedGame === "number") {
    return (
      <div className="space-y-4">
        <motion.button
          onClick={() => setSelectedGame(null)}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300"
          whileHover={{ x: -5 }}
        >
          <Icon name="ArrowLeft" size="sm" />
          <span>Back to Games</span>
        </motion.button>
        <NumberGuessingGame onWin={onWin} />
      </div>
    );
  }

  if (selectedGame === "rps") {
    return (
      <div className="space-y-4">
        <motion.button
          onClick={() => setSelectedGame(null)}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300"
          whileHover={{ x: -5 }}
        >
          <Icon name="ArrowLeft" size="sm" />
          <span>Back to Games</span>
        </motion.button>
        <RockPaperScissorsGame onWin={onWin} />
      </div>
    );
  }

  if (selectedGame === "tictactoe") {
    return (
      <div className="space-y-4">
        <motion.button
          onClick={() => setSelectedGame(null)}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300"
          whileHover={{ x: -5 }}
        >
          <Icon name="ArrowLeft" size="sm" />
          <span>Back to Games</span>
        </motion.button>
        <TicTacToeGame onWin={onWin} />
      </div>
    );
  }

  if (selectedGame === "memory") {
    return (
      <div className="space-y-4">
        <motion.button
          onClick={() => setSelectedGame(null)}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300"
          whileHover={{ x: -5 }}
        >
          <Icon name="ArrowLeft" size="sm" />
          <span>Back to Games</span>
        </motion.button>
        <MemoryMatchGame onWin={onWin} />
      </div>
    );
  }

  if (selectedGame === "color") {
    return (
      <div className="space-y-4">
        <motion.button
          onClick={() => setSelectedGame(null)}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300"
          whileHover={{ x: -5 }}
        >
          <Icon name="ArrowLeft" size="sm" />
          <span>Back to Games</span>
        </motion.button>
        <ColorMatchGame onWin={onWin} />
      </div>
    );
  }

  if (selectedGame === "reaction") {
    return (
      <div className="space-y-4">
        <motion.button
          onClick={() => setSelectedGame(null)}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300"
          whileHover={{ x: -5 }}
        >
          <Icon name="ArrowLeft" size="sm" />
          <span>Back to Games</span>
        </motion.button>
        <ReactionTimeGame onWin={onWin} />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-2xl"
    >
      {/* Header */}
      <div className="text-center mb-6">
        <div className="text-5xl mb-3">🎮</div>
        <Typography variant="h4" className="text-white font-bold mb-2">
          Mini Games
        </Typography>
        <Typography variant="body2" className="text-gray-400">
          Win any game to unlock my contact details! 🎁
        </Typography>
      </div>

      {/* Game Selection - Horizontal Scroll */}
      <div className="relative">
        <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
          {games.map((game, index) => (
            <motion.button
              key={game.id}
              onClick={() => setSelectedGame(game.id)}
              className="flex-shrink-0 w-72 p-4 bg-slate-700/30 hover:bg-slate-600/50 border border-white/10 rounded-xl transition-all duration-300 text-left group"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${game.gradient} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon
                    name={game.icon as "Target" | "Zap"}
                    size="md"
                    className="text-white"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <Typography
                    variant="h6"
                    className="text-white font-semibold mb-1 group-hover:text-blue-400 transition-colors duration-300 text-sm"
                  >
                    {game.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 text-xs"
                  >
                    {game.description}
                  </Typography>
                </div>
                <Icon
                  name="ChevronRight"
                  size="sm"
                  className="text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300"
                />
              </div>
            </motion.button>
          ))}
        </div>

        {/* Scroll indicators */}
        <div className="flex justify-center mt-4 space-x-2">
          {games.map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 bg-gray-600 rounded-full opacity-50"
            />
          ))}
        </div>
      </div>

      {/* Hint */}
      <div className="mt-4 text-center">
        <Typography variant="body2" className="text-gray-500 text-xs">
          💡 Tip: Each game has its own strategy. Choose wisely!
        </Typography>
      </div>
    </motion.div>
  );
};

export default GameSelector;
