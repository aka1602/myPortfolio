"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Typography from "@/components/atoms/Typography";
import Icon from "@/components/atoms/Icon";

const NumberGuessingGame: React.FC<{ onWin: () => void }> = ({ onWin }) => {
  const [targetNumber, setTargetNumber] = useState<number>(0);
  const [guess, setGuess] = useState<string>("");
  const [attempts, setAttempts] = useState<number>(0);
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">(
    "playing"
  );
  const [feedback, setFeedback] = useState<string>("");
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [maxAttempts] = useState<number>(6);
  const [guessHistory, setGuessHistory] = useState<number[]>([]);

  // Get smart hints based on attempts
  const getSmartHint = (target: number, attempts: number) => {
    if (attempts >= 3) {
      if (target <= 25) return "🔍 Hint: It's quite small!";
      if (target <= 50) return "🔍 Hint: It's in the lower half!";
      if (target <= 75) return "🔍 Hint: It's in the upper half!";
      return "🔍 Hint: It's quite large!";
    }
    return "";
  };

  // Initialize game
  const initializeGame = () => {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    setTargetNumber(randomNumber);
    setGuess("");
    setAttempts(0);
    setGameStatus("playing");
    setGuessHistory([]);
    setFeedback("🎯 I'm thinking of a number between 1 and 100!");
    setIsGameStarted(true);
  };

  // Handle guess submission
  const handleGuess = () => {
    const guessNumber = parseInt(guess);

    if (isNaN(guessNumber) || guessNumber < 1 || guessNumber > 100) {
      setFeedback("⚠️ Please enter a number between 1 and 100!");
      return;
    }

    if (guessHistory.includes(guessNumber)) {
      setFeedback("🔄 You already tried that number! Try a different one.");
      return;
    }

    const newAttempts = attempts + 1;
    const newHistory = [...guessHistory, guessNumber];
    setAttempts(newAttempts);
    setGuessHistory(newHistory);

    if (guessNumber === targetNumber) {
      setGameStatus("won");
      const messages = [
        "🎉 Amazing! You're a mind reader!",
        "🏆 Excellent! You found it!",
        "⭐ Brilliant! Perfect guess!",
        "🎯 Bullseye! You got it!",
      ];
      const randomMessage =
        messages[Math.floor(Math.random() * messages.length)];
      setFeedback(`${randomMessage} The number was ${targetNumber}!`);

      // Trigger the reward after a short delay
      setTimeout(() => {
        onWin();
      }, 1500);
    } else if (newAttempts >= maxAttempts) {
      setGameStatus("lost");
      setFeedback(
        `🎮 Game over! My number was ${targetNumber}. You were close!`
      );
    } else {
      const remainingAttempts = maxAttempts - newAttempts;
      const difference = Math.abs(guessNumber - targetNumber);

      let proximityHint = "";
      if (difference <= 5) proximityHint = "🔥 Very hot!";
      else if (difference <= 10) proximityHint = "🌡️ Hot!";
      else if (difference <= 20) proximityHint = "🌤️ Warm!";
      else if (difference <= 30) proximityHint = "❄️ Cold!";
      else proximityHint = "🧊 Very cold!";

      const directionHint =
        guessNumber < targetNumber ? "📈 Go higher!" : "📉 Go lower!";
      const smartHint = getSmartHint(targetNumber, newAttempts);

      setFeedback(
        `${directionHint} ${proximityHint} ${smartHint} (${remainingAttempts} left)`
      );
    }

    setGuess("");
  };

  // Handle enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && gameStatus === "playing") {
      handleGuess();
    }
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
        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
          <Icon name="Gamepad2" size="md" className="text-white" />
        </div>
        <div>
          <Typography variant="h4" className="text-white font-bold">
            🎯 Guess My Number
          </Typography>
          <Typography variant="body2" className="text-gray-400">
            Can you read my mind?
          </Typography>
        </div>
      </div>

      {!isGameStarted ? (
        /* Start Game Screen */
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">🤔</div>
          <Typography variant="body1" className="text-gray-300 text-lg">
            I&apos;m thinking of a number between{" "}
            <span className="text-blue-400 font-bold">1</span> and{" "}
            <span className="text-purple-400 font-bold">100</span>
          </Typography>
          <Typography variant="body2" className="text-gray-400">
            You have {maxAttempts} attempts to guess it. I&apos;ll give you
            hints! 🔥❄️
          </Typography>
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={initializeGame}
          >
            🎮 Let&apos;s Play!
          </motion.button>
        </div>
      ) : (
        /* Game Playing Screen */
        <div className="space-y-6">
          {/* Game Stats */}
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-slate-700/30 rounded-lg p-3">
              <div className="text-2xl font-bold text-blue-400">{attempts}</div>
              <div className="text-xs text-gray-400">Attempts Used</div>
            </div>
            <div className="bg-slate-700/30 rounded-lg p-3">
              <div className="text-2xl font-bold text-purple-400">
                {maxAttempts - attempts}
              </div>
              <div className="text-xs text-gray-400">Attempts Left</div>
            </div>
          </div>

          {/* Guess History */}
          {guessHistory.length > 0 && (
            <div className="bg-slate-700/20 rounded-lg p-4">
              <Typography
                variant="body2"
                className="text-gray-400 mb-2 text-center"
              >
                Your guesses:
              </Typography>
              <div className="flex flex-wrap gap-2 justify-center">
                {guessHistory.map((num, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-slate-600/50 text-gray-300 rounded-lg text-sm font-mono"
                  >
                    {num}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Feedback */}
          <AnimatePresence mode="wait">
            <motion.div
              key={feedback}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 bg-slate-700/50 rounded-xl border border-white/5"
            >
              <Typography variant="body1" className="text-gray-300 text-center">
                {feedback}
              </Typography>
            </motion.div>
          </AnimatePresence>

          {/* Input and Button */}
          {gameStatus === "playing" && (
            <div className="space-y-4">
              <div className="text-center">
                <Typography variant="body2" className="text-gray-400 mb-2">
                  What&apos;s your guess?
                </Typography>
                <div className="flex space-x-3 max-w-sm mx-auto">
                  <input
                    type="number"
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="1-100"
                    min="1"
                    max="100"
                    className="flex-1 px-4 py-3 bg-slate-700/50 border-2 border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center text-lg font-bold"
                  />
                  <motion.button
                    onClick={handleGuess}
                    disabled={!guess.trim()}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: guess.trim() ? 1.05 : 1 }}
                    whileTap={{ scale: guess.trim() ? 0.95 : 1 }}
                  >
                    🎯
                  </motion.button>
                </div>
              </div>
            </div>
          )}

          {/* Game Over Actions */}
          {(gameStatus === "won" || gameStatus === "lost") && (
            <div className="flex justify-center space-x-4">
              <motion.button
                onClick={initializeGame}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Play Again
              </motion.button>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default NumberGuessingGame;
