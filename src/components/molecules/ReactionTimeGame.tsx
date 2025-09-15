"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Typography from "@/components/atoms/Typography";
import Icon from "@/components/atoms/Icon";

type GameState = "waiting" | "ready" | "go" | "result" | "tooEarly";

const ReactionTimeGame: React.FC<{ onWin: () => void }> = ({ onWin }) => {
  const [gameState, setGameState] = useState<GameState>("waiting");
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [bestTime, setBestTime] = useState<number | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const startTimeRef = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startGame = () => {
    setIsGameStarted(true);
    setAttempts(0);
    setBestTime(null);
    startRound();
  };

  const startRound = () => {
    setGameState("ready");
    setReactionTime(null);

    // Random delay between 2-6 seconds
    const delay = Math.random() * 4000 + 2000;

    timeoutRef.current = setTimeout(() => {
      setGameState("go");
      startTimeRef.current = Date.now();
    }, delay);
  };

  const handleClick = () => {
    if (gameState === "ready") {
      // Clicked too early
      setGameState("tooEarly");
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setTimeout(() => {
        startRound();
      }, 2000);
    } else if (gameState === "go") {
      // Calculate reaction time
      const endTime = Date.now();
      const reaction = endTime - startTimeRef.current;
      setReactionTime(reaction);
      setGameState("result");
      setAttempts((prev) => prev + 1);

      // Update best time
      if (!bestTime || reaction < bestTime) {
        setBestTime(reaction);
      }

      // Check if won (reaction time under 300ms and at least 3 attempts)
      if (reaction < 300 && attempts >= 2) {
        setTimeout(() => {
          onWin();
        }, 2000);
      }
    }
  };

  const getReactionRating = (time: number) => {
    if (time < 200)
      return { rating: "🚀 Lightning Fast!", color: "text-green-400" };
    if (time < 250) return { rating: "⚡ Excellent!", color: "text-blue-400" };
    if (time < 300) return { rating: "🎯 Great!", color: "text-purple-400" };
    if (time < 400) return { rating: "👍 Good!", color: "text-yellow-400" };
    if (time < 500) return { rating: "😊 Not Bad!", color: "text-orange-400" };
    return { rating: "🐌 Keep Trying!", color: "text-red-400" };
  };

  const resetGame = () => {
    setGameState("waiting");
    setIsGameStarted(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const getStateColor = () => {
    switch (gameState) {
      case "ready":
        return "from-red-500 to-red-600";
      case "go":
        return "from-green-500 to-green-600";
      case "tooEarly":
        return "from-yellow-500 to-yellow-600";
      default:
        return "from-slate-600 to-slate-700";
    }
  };

  const getStateText = () => {
    switch (gameState) {
      case "ready":
        return "Wait for GREEN...";
      case "go":
        return "CLICK NOW!";
      case "tooEarly":
        return "Too Early!";
      case "result":
        return `${reactionTime}ms`;
      default:
        return "Click to Start";
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
        <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
          <Icon name="Zap" size="md" className="text-white" />
        </div>
        <div>
          <Typography variant="h4" className="text-white font-bold">
            ⚡ Reaction Time
          </Typography>
          <Typography variant="body2" className="text-gray-400">
            Test your lightning reflexes!
          </Typography>
        </div>
      </div>

      {!isGameStarted ? (
        /* Start Game Screen */
        <div className="text-center space-y-8">
          <div className="relative">
            <div className="text-7xl mb-6">⚡</div>
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="absolute -top-2 -right-2 text-2xl"
            >
              💨
            </motion.div>
          </div>

          <div className="bg-slate-700/30 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <Typography variant="body1" className="text-gray-300 text-lg mb-4">
              Test your reflexes in this{" "}
              <span className="text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text font-bold">
                Reaction Time
              </span>{" "}
              challenge!
            </Typography>
            <Typography variant="body2" className="text-gray-400 mb-6">
              Click when the screen turns GREEN. Get under 300ms to win! ⚡
            </Typography>
            <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
              <div className="text-center">
                <div className="text-2xl mb-2">🔴</div>
                <Typography variant="body2" className="text-gray-400 text-xs">
                  Wait
                </Typography>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🟢</div>
                <Typography variant="body2" className="text-gray-400 text-xs">
                  Click!
                </Typography>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">⚡</div>
                <Typography variant="body2" className="text-gray-400 text-xs">
                  &lt;300ms
                </Typography>
              </div>
            </div>
          </div>

          <motion.button
            className="px-10 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-semibold shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 text-lg border border-yellow-400/20"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={startGame}
          >
            <span className="flex items-center space-x-2">
              <span>⚡</span>
              <span>Test Reflexes!</span>
            </span>
          </motion.button>
        </div>
      ) : (
        /* Game Playing Screen */
        <div className="space-y-6">
          {/* Game Stats */}
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-slate-700/30 rounded-lg p-3">
              <div className="text-2xl font-bold text-yellow-400">
                {bestTime ? `${bestTime}ms` : "--"}
              </div>
              <div className="text-xs text-gray-400">Best Time</div>
            </div>
            <div className="bg-slate-700/30 rounded-lg p-3">
              <div className="text-2xl font-bold text-orange-400">
                {attempts}
              </div>
              <div className="text-xs text-gray-400">Attempts</div>
            </div>
          </div>

          {/* Main Game Area */}
          <div className="flex justify-center">
            <motion.button
              className={`w-80 h-80 rounded-3xl bg-gradient-to-br ${getStateColor()} border-4 border-white/20 flex flex-col items-center justify-center text-white font-bold text-2xl shadow-2xl transition-all duration-300`}
              onClick={handleClick}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              animate={{
                scale: gameState === "go" ? [1, 1.05, 1] : 1,
              }}
              transition={{
                duration: 0.5,
                repeat: gameState === "go" ? Infinity : 0,
              }}
            >
              <div className="text-6xl mb-4">
                {gameState === "ready" && "🔴"}
                {gameState === "go" && "🟢"}
                {gameState === "tooEarly" && "⚠️"}
                {gameState === "result" && "⚡"}
                {gameState === "waiting" && "👆"}
              </div>
              <div className="text-center">{getStateText()}</div>
            </motion.button>
          </div>

          {/* Result Display */}
          <AnimatePresence>
            {gameState === "result" && reactionTime && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center space-y-4"
              >
                <div className="bg-slate-700/30 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <Typography
                    variant="h5"
                    className={`font-bold mb-2 ${
                      getReactionRating(reactionTime).color
                    }`}
                  >
                    {getReactionRating(reactionTime).rating}
                  </Typography>
                  <Typography variant="body1" className="text-white mb-2">
                    Reaction Time:{" "}
                    <span className="font-bold">{reactionTime}ms</span>
                  </Typography>
                  {reactionTime < 300 && attempts >= 3 && (
                    <Typography variant="body2" className="text-green-400">
                      🎁 Amazing reflexes! You&apos;ve unlocked my contact
                      details!
                    </Typography>
                  )}
                </div>

                <div className="flex justify-center space-x-4">
                  <motion.button
                    onClick={startRound}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Try Again
                  </motion.button>
                  <motion.button
                    onClick={resetGame}
                    className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Reset
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Instructions */}
          <div className="text-center">
            <Typography variant="body2" className="text-gray-400">
              {gameState === "ready" &&
                "Wait for the green light... Don't click yet!"}
              {gameState === "go" && "Click as fast as you can!"}
              {gameState === "tooEarly" &&
                "You clicked too early! Wait for green."}
              {gameState === "result" &&
                "Click 'Try Again' for another attempt!"}
            </Typography>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ReactionTimeGame;
