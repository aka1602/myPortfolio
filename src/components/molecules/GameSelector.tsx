"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Typography from "@/components/atoms/Typography";
import Icon from "@/components/atoms/Icon";
import NumberGuessingGame from "./NumberGuessingGame";
import RockPaperScissorsGame from "./RockPaperScissorsGame";

type GameType = "number" | "rps" | null;

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-2xl"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🎮</div>
        <Typography variant="h3" className="text-white font-bold mb-2">
          Mini Games
        </Typography>
        <Typography variant="body1" className="text-gray-400">
          Win any game to unlock my contact details! 🎁
        </Typography>
      </div>

      {/* Game Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {games.map((game) => (
          <motion.button
            key={game.id}
            onClick={() => setSelectedGame(game.id)}
            className="p-6 bg-slate-700/30 hover:bg-slate-600/50 border border-white/10 rounded-xl transition-all duration-300 text-left group"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center space-x-4">
              <div
                className={`w-14 h-14 bg-gradient-to-br ${game.gradient} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
              >
                <Icon
                  name={game.icon as "Target" | "Zap"}
                  size="lg"
                  className="text-white"
                />
              </div>
              <div className="flex-1 min-w-0">
                <Typography
                  variant="h4"
                  className="text-white font-bold mb-2 group-hover:text-blue-400 transition-colors duration-300"
                >
                  {game.title}
                </Typography>
                <Typography
                  variant="body2"
                  className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300"
                >
                  {game.description}
                </Typography>
              </div>
              <Icon
                name="ChevronRight"
                size="md"
                className="text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300"
              />
            </div>
          </motion.button>
        ))}
      </div>

      {/* Hint */}
      <div className="mt-6 text-center">
        <Typography variant="body2" className="text-gray-500">
          💡 Tip: Each game has its own strategy. Choose wisely!
        </Typography>
      </div>
    </motion.div>
  );
};

export default GameSelector;
