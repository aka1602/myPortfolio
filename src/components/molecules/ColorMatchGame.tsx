"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Typography from "@/components/atoms/Typography";
import Icon from "@/components/atoms/Icon";

type ColorOption = {
  name: string;
  value: string;
  gradient: string;
};

const ColorMatchGame: React.FC<{ onWin: () => void }> = ({ onWin }) => {
  const [targetColor, setTargetColor] = useState<ColorOption | null>(null);
  const [options, setOptions] = useState<ColorOption[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [streak, setStreak] = useState(0);

  const colors: ColorOption[] = [
    { name: "Crimson", value: "#DC143C", gradient: "from-red-500 to-red-600" },
    {
      name: "Ocean Blue",
      value: "#006994",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      name: "Forest Green",
      value: "#228B22",
      gradient: "from-green-500 to-green-600",
    },
    {
      name: "Royal Purple",
      value: "#6A0DAD",
      gradient: "from-purple-500 to-purple-600",
    },
    {
      name: "Sunset Orange",
      value: "#FF8C00",
      gradient: "from-orange-500 to-orange-600",
    },
    {
      name: "Hot Pink",
      value: "#FF1493",
      gradient: "from-pink-500 to-pink-600",
    },
    {
      name: "Golden Yellow",
      value: "#FFD700",
      gradient: "from-yellow-500 to-yellow-600",
    },
    { name: "Teal", value: "#008080", gradient: "from-teal-500 to-teal-600" },
    {
      name: "Indigo",
      value: "#4B0082",
      gradient: "from-indigo-500 to-indigo-600",
    },
    {
      name: "Lime Green",
      value: "#32CD32",
      gradient: "from-lime-500 to-lime-600",
    },
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isGameStarted && timeLeft > 0 && !gameWon) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (score >= 10) {
              setGameWon(true);
              setTimeout(() => onWin(), 1500);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isGameStarted, timeLeft, gameWon, score, onWin]);

  const generateRound = () => {
    const shuffledColors = [...colors].sort(() => Math.random() - 0.5);
    const target = shuffledColors[0];
    const wrongOptions = shuffledColors.slice(1, 4);
    const allOptions = [target, ...wrongOptions].sort(
      () => Math.random() - 0.5
    );

    setTargetColor(target);
    setOptions(allOptions);
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setIsGameStarted(true);
    setGameWon(false);
    setStreak(0);
    generateRound();
  };

  const handleColorSelect = (selectedColor: ColorOption) => {
    if (selectedColor.value === targetColor?.value) {
      setScore((prev) => prev + 1);
      setStreak((prev) => prev + 1);

      if (score + 1 >= 10) {
        setGameWon(true);
        setTimeout(() => onWin(), 1500);
      } else {
        generateRound();
      }
    } else {
      setStreak(0);
      generateRound();
    }
  };

  const getStreakBonus = () => {
    if (streak >= 5) return "🔥 ON FIRE!";
    if (streak >= 3) return "⚡ HOT STREAK!";
    return "";
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
        <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
          <Icon name="Zap" size="md" className="text-white" />
        </div>
        <div>
          <Typography variant="h4" className="text-white font-bold">
            🎨 Color Match
          </Typography>
          <Typography variant="body2" className="text-gray-400">
            Match colors with their names!
          </Typography>
        </div>
      </div>

      {!isGameStarted ? (
        /* Start Game Screen */
        <div className="text-center space-y-8">
          <div className="relative">
            <div className="text-7xl mb-6">🎨</div>
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute -top-2 -right-2 text-2xl"
            >
              🌈
            </motion.div>
          </div>

          <div className="bg-slate-700/30 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <Typography variant="body1" className="text-gray-300 text-lg mb-4">
              Test your color knowledge in this{" "}
              <span className="text-transparent bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text font-bold">
                Color Match
              </span>{" "}
              challenge!
            </Typography>
            <Typography variant="body2" className="text-gray-400 mb-6">
              Match 10 colors correctly within 30 seconds to win! 🎯
            </Typography>
            <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
              <div className="text-center">
                <div className="text-2xl mb-2">🎯</div>
                <Typography variant="body2" className="text-gray-400 text-xs">
                  10 Matches
                </Typography>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">⏱️</div>
                <Typography variant="body2" className="text-gray-400 text-xs">
                  30 Seconds
                </Typography>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🔥</div>
                <Typography variant="body2" className="text-gray-400 text-xs">
                  Streak Bonus
                </Typography>
              </div>
            </div>
          </div>

          <motion.button
            className="px-10 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-semibold shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 text-lg border border-pink-400/20"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={startGame}
          >
            <span className="flex items-center space-x-2">
              <span>🎨</span>
              <span>Start Challenge!</span>
            </span>
          </motion.button>
        </div>
      ) : (
        /* Game Playing Screen */
        <div className="space-y-6">
          {/* Game Stats */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-slate-700/30 rounded-lg p-3">
              <div className="text-2xl font-bold text-pink-400">{score}/10</div>
              <div className="text-xs text-gray-400">Score</div>
            </div>
            <div className="bg-slate-700/30 rounded-lg p-3">
              <div className="text-2xl font-bold text-rose-400">
                {timeLeft}s
              </div>
              <div className="text-xs text-gray-400">Time</div>
            </div>
            <div className="bg-slate-700/30 rounded-lg p-3">
              <div className="text-2xl font-bold text-orange-400">{streak}</div>
              <div className="text-xs text-gray-400">Streak</div>
            </div>
          </div>

          {/* Streak Bonus */}
          <AnimatePresence>
            {getStreakBonus() && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-center"
              >
                <Typography variant="h6" className="text-orange-400 font-bold">
                  {getStreakBonus()}
                </Typography>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Target Color */}
          {targetColor && (
            <div className="text-center">
              <Typography variant="body2" className="text-gray-400 mb-4">
                Find this color:
              </Typography>
              <motion.div
                className={`w-24 h-24 mx-auto rounded-2xl shadow-lg bg-gradient-to-br ${targetColor.gradient} border-4 border-white/20`}
                whileHover={{ scale: 1.05 }}
                style={{ backgroundColor: targetColor.value }}
              />
              <Typography variant="h5" className="text-white font-bold mt-4">
                {targetColor.name}
              </Typography>
            </div>
          )}

          {/* Color Options */}
          <div className="grid grid-cols-2 gap-4">
            {options.map((color, index) => (
              <motion.button
                key={`${color.name}-${index}`}
                className={`p-4 rounded-xl border-2 border-white/10 hover:border-pink-400/50 transition-all duration-300 bg-slate-600/30 hover:bg-slate-500/50`}
                onClick={() => handleColorSelect(color)}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div
                  className={`w-16 h-16 mx-auto rounded-xl mb-3 bg-gradient-to-br ${color.gradient} shadow-lg`}
                  style={{ backgroundColor: color.value }}
                />
                <Typography
                  variant="body2"
                  className="text-white font-semibold text-sm"
                >
                  {color.name}
                </Typography>
              </motion.button>
            ))}
          </div>

          {/* Win/Lose Message */}
          <AnimatePresence>
            {(gameWon || (timeLeft === 0 && !gameWon)) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-center py-4"
              >
                {gameWon ? (
                  <>
                    <Typography
                      variant="h4"
                      className="text-white font-bold mb-2"
                    >
                      🎉 Color Master!
                    </Typography>
                    <Typography variant="body2" className="text-green-400 mb-2">
                      🎁 You&apos;ve unlocked my contact details!
                    </Typography>
                    <Typography variant="body2" className="text-gray-400">
                      Perfect score with {streak} final streak!
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography
                      variant="h4"
                      className="text-white font-bold mb-2"
                    >
                      ⏰ Time&apos;s Up!
                    </Typography>
                    <Typography variant="body2" className="text-yellow-400">
                      You scored {score}/10. Try again to unlock rewards!
                    </Typography>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Reset Button */}
          {(gameWon || timeLeft === 0) && (
            <div className="flex justify-center">
              <motion.button
                onClick={startGame}
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
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

export default ColorMatchGame;
