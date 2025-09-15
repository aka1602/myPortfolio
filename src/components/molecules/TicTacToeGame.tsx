"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Typography from "@/components/atoms/Typography";
import Icon from "@/components/atoms/Icon";

type Player = "X" | "O" | null;
type GameResult = "win" | "lose" | "draw" | null;

const TicTacToeGame: React.FC<{ onWin: () => void }> = ({ onWin }) => {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [gameResult, setGameResult] = useState<GameResult>(null);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [winningLine, setWinningLine] = useState<number[]>([]);

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  const checkWinner = (
    currentBoard: Player[]
  ): { winner: Player; line: number[] } | null => {
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return { winner: currentBoard[a], line: combination };
      }
    }
    return null;
  };

  const isBoardFull = (currentBoard: Player[]): boolean => {
    return currentBoard.every((cell) => cell !== null);
  };

  const getBestMove = (currentBoard: Player[]): number => {
    // Simple AI: Try to win, then block player, then take center/corners

    // Try to win
    for (let i = 0; i < 9; i++) {
      if (currentBoard[i] === null) {
        const testBoard = [...currentBoard];
        testBoard[i] = "O";
        if (checkWinner(testBoard)?.winner === "O") {
          return i;
        }
      }
    }

    // Try to block player
    for (let i = 0; i < 9; i++) {
      if (currentBoard[i] === null) {
        const testBoard = [...currentBoard];
        testBoard[i] = "X";
        if (checkWinner(testBoard)?.winner === "X") {
          return i;
        }
      }
    }

    // Take center if available
    if (currentBoard[4] === null) return 4;

    // Take corners
    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter((i) => currentBoard[i] === null);
    if (availableCorners.length > 0) {
      return availableCorners[
        Math.floor(Math.random() * availableCorners.length)
      ];
    }

    // Take any available spot
    const availableSpots = currentBoard
      .map((cell, index) => (cell === null ? index : null))
      .filter((val) => val !== null);
    return availableSpots[
      Math.floor(Math.random() * availableSpots.length)
    ] as number;
  };

  const makeMove = (index: number) => {
    if (board[index] !== null || !isPlayerTurn || gameResult !== null) return;

    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);
    setIsPlayerTurn(false);

    const winResult = checkWinner(newBoard);
    if (winResult) {
      if (winResult.winner === "X") {
        setGameResult("win");
        setWinningLine(winResult.line);
        setTimeout(() => {
          onWin();
        }, 1500);
      }
      return;
    }

    if (isBoardFull(newBoard)) {
      setGameResult("draw");
      return;
    }

    // Computer move after delay
    setTimeout(() => {
      const computerMove = getBestMove(newBoard);
      const computerBoard = [...newBoard];
      computerBoard[computerMove] = "O";
      setBoard(computerBoard);

      const computerWinResult = checkWinner(computerBoard);
      if (computerWinResult) {
        setGameResult("lose");
        setWinningLine(computerWinResult.line);
      } else if (isBoardFull(computerBoard)) {
        setGameResult("draw");
      } else {
        setIsPlayerTurn(true);
      }
    }, 500);
  };

  const startGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setGameResult(null);
    setIsGameStarted(true);
    setWinningLine([]);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setGameResult(null);
    setWinningLine([]);
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
      draw: ["🤝 It's a tie!", "🔄 Draw!", "⚖️ Even match!", "🎭 Good game!"],
    };

    if (!result) return "";
    const randomMessage =
      messages[result][Math.floor(Math.random() * messages[result].length)];
    return randomMessage;
  };

  const getCellContent = (cell: Player, index: number) => {
    if (cell === "X") {
      return (
        <div className="w-12 h-12 flex items-center justify-center">
          <div className="text-blue-400 text-3xl font-bold leading-none">✕</div>
        </div>
      );
    }
    if (cell === "O") {
      return (
        <div className="w-12 h-12 flex items-center justify-center">
          <div className="text-red-400 text-3xl font-bold leading-none">○</div>
        </div>
      );
    }
    return null;
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
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
          <Icon name="Zap" size="md" className="text-white" />
        </div>
        <div>
          <Typography variant="h4" className="text-white font-bold">
            🎯 Tic Tac Toe
          </Typography>
          <Typography variant="body2" className="text-gray-400">
            Beat the AI to unlock a secret!
          </Typography>
        </div>
      </div>

      {!isGameStarted ? (
        /* Start Game Screen */
        <div className="text-center space-y-8">
          <div className="relative">
            <div className="text-7xl mb-6">🎯</div>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-2 -right-2 text-2xl"
            >
              ✨
            </motion.div>
          </div>

          <div className="bg-slate-700/30 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <Typography variant="body1" className="text-gray-300 text-lg mb-4">
              Challenge the AI in a classic game of{" "}
              <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-bold">
                Tic Tac Toe
              </span>
            </Typography>
            <div className="flex items-center justify-center space-x-6 mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-500/20 border border-blue-400 rounded-lg flex items-center justify-center">
                  <span className="text-blue-400 font-bold">✕</span>
                </div>
                <span className="text-blue-400 font-semibold">You</span>
              </div>
              <span className="text-gray-400 font-bold">VS</span>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-red-500/20 border border-red-400 rounded-lg flex items-center justify-center">
                  <span className="text-red-400 font-bold">○</span>
                </div>
                <span className="text-red-400 font-semibold">AI</span>
              </div>
            </div>
            <Typography variant="body2" className="text-gray-400 mb-6">
              Get three in a row (horizontal, vertical, or diagonal) to win! 🏆
            </Typography>
          </div>

          <motion.button
            className="px-10 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 text-lg border border-purple-400/20"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={startGame}
          >
            <span className="flex items-center space-x-2">
              <span>🎮</span>
              <span>Let&apos;s Play!</span>
            </span>
          </motion.button>
        </div>
      ) : (
        /* Game Playing Screen */
        <div className="space-y-6">
          {/* Game Status */}
          <div className="text-center mb-6">
            <div className="bg-slate-700/30 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <Typography variant="body1" className="text-gray-300">
                {gameResult === null ? (
                  isPlayerTurn ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-6 h-6 bg-blue-500/20 border border-blue-400 rounded-lg flex items-center justify-center">
                        <span className="text-blue-400 text-sm font-bold">
                          ✕
                        </span>
                      </div>
                      <span className="text-blue-400 font-semibold">
                        Your Turn
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-6 h-6 bg-red-500/20 border border-red-400 rounded-lg flex items-center justify-center">
                        <span className="text-red-400 text-sm font-bold">
                          ○
                        </span>
                      </div>
                      <span className="text-red-400 font-semibold">
                        AI Thinking...
                      </span>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full"
                      />
                    </div>
                  )
                ) : (
                  <span className="text-white font-semibold text-lg">
                    {getResultMessage(gameResult)}
                  </span>
                )}
              </Typography>
            </div>
          </div>

          {/* Game Board */}
          <div className="flex justify-center">
            <div className="bg-slate-700/30 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
              <div className="grid grid-cols-3 gap-3">
                {board.map((cell, index) => (
                  <motion.button
                    key={index}
                    className={`w-16 h-16 md:w-20 md:h-20 bg-slate-600/50 backdrop-blur-sm border-2 rounded-xl flex items-center justify-center transition-all duration-300 relative overflow-hidden ${
                      cell === null && isPlayerTurn && gameResult === null
                        ? "hover:bg-slate-500/70 border-purple-400/50 cursor-pointer hover:shadow-lg hover:shadow-purple-500/20"
                        : "cursor-not-allowed border-white/10"
                    } ${
                      winningLine.includes(index)
                        ? "bg-gradient-to-br from-green-500/30 to-emerald-500/30 border-green-400 shadow-lg shadow-green-500/20"
                        : ""
                    }`}
                    onClick={() => makeMove(index)}
                    whileHover={
                      cell === null && isPlayerTurn && gameResult === null
                        ? { scale: 1.05, y: -2 }
                        : {}
                    }
                    whileTap={
                      cell === null && isPlayerTurn && gameResult === null
                        ? { scale: 0.95 }
                        : {}
                    }
                    disabled={
                      cell !== null || !isPlayerTurn || gameResult !== null
                    }
                  >
                    {/* Hover effect background */}
                    {cell === null && isPlayerTurn && gameResult === null && (
                      <motion.div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    )}

                    <AnimatePresence>
                      {cell && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180, opacity: 0 }}
                          animate={{ scale: 1, rotate: 0, opacity: 1 }}
                          exit={{ scale: 0, rotate: 180, opacity: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                            duration: 0.4,
                          }}
                          className="relative z-10"
                        >
                          {getCellContent(cell, index)}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Cell number for empty cells (subtle) */}
                    {cell === null && gameResult === null && (
                      <span className="absolute bottom-1 right-1 text-xs text-gray-500 opacity-30">
                        {index + 1}
                      </span>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Result Message */}
          <AnimatePresence mode="wait">
            {gameResult && (
              <motion.div
                key={gameResult}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-center py-4"
              >
                <Typography variant="h4" className="text-white font-bold mb-2">
                  {getResultMessage(gameResult)}
                </Typography>
                {gameResult === "win" && (
                  <Typography variant="body2" className="text-green-400">
                    🎁 You&apos;ve unlocked my contact details!
                  </Typography>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Game Actions */}
          {gameResult !== null && (
            <div className="flex justify-center space-x-4">
              <motion.button
                onClick={resetGame}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
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

export default TicTacToeGame;
