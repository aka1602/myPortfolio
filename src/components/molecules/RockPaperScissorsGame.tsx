"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Typography from "@/components/atoms/Typography";
import Icon from "@/components/atoms/Icon";

type Choice = "rock" | "paper" | "scissors";
type GameResult = "win" | "lose" | "draw";

interface GameStats {
  wins: number;
  losses: number;
  draws: number;
}

const RockPaperScissorsGame: React.FC<{ onWin: () => void }> = ({ onWin }) => {
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<GameResult | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameStats, setGameStats] = useState<GameStats>({
    wins: 0,
    losses: 0,
    draws: 0,
  });
  const [showResult, setShowResult] = useState(false);

  const choices: { name: Choice; emoji: string; icon: string }[] = [
    { name: "rock", emoji: "🪨", icon: "Mountain" },
    { name: "paper", emoji: "📄", icon: "FileText" },
    { name: "scissors", emoji: "✂️", icon: "Scissors" },
  ];

  const getRandomChoice = (): Choice => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex].name;
  };

  const determineWinner = (player: Choice, computer: Choice): GameResult => {
    if (player === computer) return "draw";

    const winConditions: Record<Choice, Choice> = {
      rock: "scissors",
      paper: "rock",
      scissors: "paper",
    };

    return winConditions[player] === computer ? "win" : "lose";
  };

  const playGame = (choice: Choice) => {
    if (isPlaying) return;

    setIsPlaying(true);
    setPlayerChoice(choice);
    setShowResult(false);

    // Add suspense with delayed computer choice
    setTimeout(() => {
      const computerChoice = getRandomChoice();
      setComputerChoice(computerChoice);

      const gameResult = determineWinner(choice, computerChoice);
      setResult(gameResult);

      // Update stats
      setGameStats((prev) => ({
        ...prev,
        [gameResult === "win"
          ? "wins"
          : gameResult === "lose"
          ? "losses"
          : "draws"]:
          prev[
            gameResult === "win"
              ? "wins"
              : gameResult === "lose"
              ? "losses"
              : "draws"
          ] + 1,
      }));

      setShowResult(true);
      setIsPlaying(false);

      // If player wins, trigger the reward
      if (gameResult === "win") {
        setTimeout(() => {
          onWin();
        }, 1500);
      }
    }, 1500);
  };

  const resetGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
    setShowResult(false);
  };

  const getResultMessage = (result: GameResult): string => {
    const messages = {
      win: ["🎉 You won!", "🏆 Victory!", "⭐ Amazing!", "🎯 Perfect!"],
      lose: [
        "😅 I won this time!",
        "🤖 Computer wins!",
        "💪 Better luck next time!",
        "🎮 Try again!",
      ],
      draw: ["🤝 It's a tie!", "🔄 Draw!", "⚖️ Even match!", "🎭 Same choice!"],
    };

    const randomMessage =
      messages[result][Math.floor(Math.random() * messages[result].length)];
    return randomMessage;
  };

  const getChoiceEmoji = (choice: Choice): string => {
    return choices.find((c) => c.name === choice)?.emoji || "❓";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-2xl"
    >
      {/* Game Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
          <Icon name="Zap" size="md" className="text-white" />
        </div>
        <div>
          <Typography variant="h4" className="text-white font-bold">
            🪨📄✂️ Rock Paper Scissors
          </Typography>
          <Typography variant="body2" className="text-gray-400">
            Beat me to unlock a secret!
          </Typography>
        </div>
      </div>

      {/* Game Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-green-500/20 rounded-lg p-3 text-center">
          <div className="text-xl font-bold text-green-400">
            {gameStats.wins}
          </div>
          <div className="text-xs text-gray-400">Wins</div>
        </div>
        <div className="bg-yellow-500/20 rounded-lg p-3 text-center">
          <div className="text-xl font-bold text-yellow-400">
            {gameStats.draws}
          </div>
          <div className="text-xs text-gray-400">Draws</div>
        </div>
        <div className="bg-red-500/20 rounded-lg p-3 text-center">
          <div className="text-xl font-bold text-red-400">
            {gameStats.losses}
          </div>
          <div className="text-xs text-gray-400">Losses</div>
        </div>
      </div>

      {/* Game Area */}
      <div className="space-y-6">
        {/* Choices Display */}
        <div className="flex justify-center items-center space-x-8 md:space-x-12">
          {/* Player Choice */}
          <div className="text-center">
            <Typography
              variant="body2"
              className="text-gray-400 mb-3 font-semibold"
            >
              You
            </Typography>
            <div className="w-24 h-24 md:w-28 md:h-28 bg-slate-700/50 rounded-2xl flex items-center justify-center text-4xl md:text-5xl border-2 border-blue-500/20 shadow-lg">
              {playerChoice ? getChoiceEmoji(playerChoice) : "❓"}
            </div>
          </div>

          {/* VS */}
          <div className="text-center px-4">
            <Typography
              variant="h2"
              className="text-gray-500 font-bold text-2xl md:text-3xl"
            >
              VS
            </Typography>
          </div>

          {/* Computer Choice */}
          <div className="text-center">
            <Typography
              variant="body2"
              className="text-gray-400 mb-3 font-semibold"
            >
              Computer
            </Typography>
            <motion.div
              className="w-24 h-24 md:w-28 md:h-28 bg-slate-700/50 rounded-2xl flex items-center justify-center text-4xl md:text-5xl border-2 border-red-500/20 shadow-lg"
              animate={isPlaying ? { rotate: [0, 180, 360] } : {}}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              {isPlaying
                ? "🤔"
                : computerChoice
                ? getChoiceEmoji(computerChoice)
                : "❓"}
            </motion.div>
          </div>
        </div>

        {/* Result */}
        <AnimatePresence mode="wait">
          {showResult && result && (
            <motion.div
              key={result}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center py-4"
            >
              <Typography variant="h4" className="text-white font-bold mb-2">
                {getResultMessage(result)}
              </Typography>
              {result === "win" && (
                <Typography variant="body2" className="text-green-400">
                  🎁 You've unlocked my contact details!
                </Typography>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Choice Buttons */}
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
          {choices.map((choice) => (
            <motion.button
              key={choice.name}
              onClick={() => playGame(choice.name)}
              disabled={isPlaying}
              className="p-6 bg-slate-700/30 hover:bg-slate-600/50 border border-white/10 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
              whileHover={{ scale: isPlaying ? 1 : 1.05 }}
              whileTap={{ scale: isPlaying ? 1 : 0.95 }}
            >
              <div className="text-4xl md:text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {choice.emoji}
              </div>
              <Typography
                variant="body2"
                className="text-gray-300 capitalize font-semibold group-hover:text-white transition-colors duration-300"
              >
                {choice.name}
              </Typography>
            </motion.button>
          ))}
        </div>

        {/* Instructions */}
        <div className="text-center">
          <Typography variant="body2" className="text-gray-400">
            {isPlaying
              ? "🤔 Thinking..."
              : "Choose your weapon! Win to unlock my contact info 🎁"}
          </Typography>
        </div>

        {/* Reset Button */}
        {showResult && (
          <div className="text-center">
            <motion.button
              onClick={resetGame}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🔄 Play Again
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default RockPaperScissorsGame;
