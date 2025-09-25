import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const initialPlayers = {
  გიორგი: { score: 0, avatar: "🧑‍💼", badges: [] },
  ნინო: { score: 0, avatar: "👩‍💻", badges: [] },
  ლუკა: { score: 0, avatar: "👨‍⚖️", badges: [] }
};

const events = [
  { player: "გიორგი", points: 10, reason: "Liability Clause მონიშნა", delay: 1000 },
  { player: "ლუკა", points: 10, reason: "Termination Clause მონიშნა", delay: 2000 },
  { player: "ნინო", points: 15, reason: "Indemnification Clause + Speed Bonus", delay: 3000 },
  { player: "გიორგი", points: 15, reason: "Redline Proposal: Liability capped", delay: 4000 },
  { player: "ლუკა", points: 15, reason: "Redline Proposal: Termination notice 60 days", delay: 5000 },
  { player: "ნინო", points: 35, reason: "Best Suggestion: Indemnification capped", delay: 6000 }
];

const badgeMilestones = [50, 100, 150];

export default function App() {
  const [players, setPlayers] = useState(initialPlayers);
  const [log, setLog] = useState([]);
  const logRef = useRef();

  // Simulated events
  useEffect(() => {
    events.forEach(event => {
      setTimeout(() => {
        addPoints(event.player, event.points, event.reason);
      }, event.delay);
    });
  }, []);

  const addPoints = (player, points, reason) => {
    setPlayers(prev => {
      const newScore = prev[player].score + points;
      let newBadges = [...prev[player].badges];
      badgeMilestones.forEach(milestone => {
        if (newScore >= milestone && !newBadges.includes(milestone)) {
          newBadges.push(milestone);
        }
      });
      return {
        ...prev,
        [player]: { ...prev[player], score: newScore, badges: newBadges }
      };
    });
    setLog(prev => [...prev, { player, points, reason }]);
  };

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [log]);

  const handleSelectionClick = (player) => {
    const selection = window.getSelection().toString().trim();
    if (!selection) return alert("გთხოვთ მონიშნეთ ტექსტი ჯერ.");
    addPoints(player, 10, `Selected text: "${selection}"`);
    window.getSelection().removeAllRanges();
  };

  const sortedPlayers = Object.entries(players).sort((a, b) => b[1].score - a[1].score);
  const maxScore = Math.max(...Object.values(players).map(p => p.score), 100);

  return (
    <div className="p-6 font-sans max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">🎮 ContractRiskBot Demo</h1>

      <h2 className="text-2xl mb-2">Leaderboard</h2>
      <div className="space-y-3 mb-6">
        {sortedPlayers.map(([name, data], idx) => (
          <motion.div
            key={name}
            animate={{ scale: idx === 0 ? 1.05 : 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="flex items-center space-x-3 p-2 rounded-lg bg-gray-100"
          >
            <span className="text-2xl">{data.avatar}</span>
            <div className="flex-1">
              <div className="flex justify-between mb-1 items-center">
                <span className="font-semibold">{name}</span>
                <span>{data.score}</span>
              </div>
              <div className="bg-gray-200 rounded-full h-4 relative overflow-hidden">
                <motion.div
                  className="bg-green-500 h-4 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(data.score/maxScore)*100}%` }}
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute top-0 left-0 flex space-x-1 px-1">
                  {data.badges.map((b, i) => (
                    <motion.span key={i} animate={{ scale: [0,1.2,1] }} transition={{ duration: 0.5 }} className="text-yellow-400">🏆</motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <h2 className="text-2xl mb-2">Events Log</h2>
      <div ref={logRef} className="border p-3 h-48 overflow-y-scroll mb-6 bg-gray-50 rounded">
        <AnimatePresence initial={false}>
          {log.map((entry, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-1 text-sm"
            >
              ✅ <span className="font-semibold">{entry.player}</span> +{entry.points} ({entry.reason})
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <h2 className="text-2xl mb-2">Interactive Scoring</h2>
      <p className="mb-2">მონიშნეთ ტექსტი ქვემოთ და დააჭირეთ ბატონს, რათა ქულები დაემატოს.</p>
      <div className="border-2 border-dashed border-gray-400 p-4 mb-3 rounded">
        ლorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac leo nunc. Vestibulum et mauris vel ante finibus maximus.
      </div>
      <div className="flex space-x-2">
        {Object.keys(players).map(player => (
          <button
            key={player}
            onClick={() => handleSelectionClick(player)}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {player}-ს ქულა მონიშვნაზე
          </button>
        ))}
      </div>
    </div>
  );
}
