
import React, { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";

const avatarOptions = [
  "🧑‍💼", "👩‍💻", "👨‍⚖️", "🦸‍♂️", "🦸‍♀️", "🧑‍🎨", "🧑‍🚀", "🧑‍🔬", "🧑‍🏫", "🧑‍🌾", "🧑‍🍳", "🧑‍🎤"
];



const badgeMilestones = [50, 100, 150];


export default function App() {
  // Onboarding state
  const [onboarding, setOnboarding] = useState(true);
  const [playerInputs, setPlayerInputs] = useState([
    { name: "", avatar: avatarOptions[0] },
    { name: "", avatar: avatarOptions[1] },
    { name: "", avatar: avatarOptions[2] }
  ]);
  const [players, setPlayers] = useState({});
  const [log, setLog] = useState([]);
  const [docText, setDocText] = useState("");
  const [docName, setDocName] = useState("");
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY || "";
  const [aiLoading, setAiLoading] = useState(false);
  const [aiRisks, setAiRisks] = useState([]);
  const [aiError, setAiError] = useState("");
  const [showRisks, setShowRisks] = useState(false);
  const [winner, setWinner] = useState(null);
  const logRef = useRef();

  // AI-powered risk detection
  const handleDetectRisks = async () => {
    if (!apiKey) {
      setAiError("Please enter your OpenAI API key.");
      return;
    }
    if (!docText) {
      setAiError("Please upload or paste a document first.");
      return;
    }
    setAiError("");
    setAiLoading(true);
    setAiRisks([]);
    try {
  const prompt = `You are a contract risk analysis assistant. Analyze the following contract text and extract a list of risky clauses, such as 'Liability Clause', 'Termination Clause', 'Indemnification Clause', etc. For each risk, provide:\n- The clause type (e.g., Liability Clause)\n- The exact text from the contract\n- A short explanation of why it is risky.\n- The risk severity: High, Medium, or Low.\nReturn the result as a JSON array with objects: { type, text, explanation, severity }\n\nContract:\n${docText}`;
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a helpful contract risk analysis assistant." },
            { role: "user", content: prompt }
          ],
          max_tokens: 1024,
          temperature: 0.2
        })
      });
      const data = await response.json();
      let risks = [];
      // Try to parse JSON from the response
      if (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
        const content = data.choices[0].message.content;
        try {
          // Find the first JSON array in the response
          const match = content.match(/\[.*\]/s);
          if (match) {
            risks = JSON.parse(match[0]);
          }
        } catch (e) {
          setAiError("Could not parse AI response. Try again or with a smaller document.");
        }
      }
      setAiRisks(risks);
      if (!risks.length) setAiError("No risks detected or could not parse AI response.");
    } catch (err) {
      setAiError("Error contacting OpenAI API. Check your key and try again.");
    }
    setAiLoading(false);
  };



  // Add points, check for badge, and log event (always log, even if points = 0)
  const addPoints = (player, points, reason, selection, severity) => {
    if (points > 0) {
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
    }
    setLog(prev => [
      ...prev,
      {
        player,
        points,
        reason,
        selection,
        severity,
        time: new Date().toLocaleTimeString()
      }
    ]);
  };

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [log]);

  // Document upload handler
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setDocName(file.name);
    const reader = new FileReader();
    reader.onload = (evt) => {
      setDocText(evt.target.result);
    };
    reader.readAsText(file);
  };

  // Document paste handler
  const handlePaste = (e) => {
    setDocText(e.target.value);
    setDocName("Pasted Document");
  };

  // Real-time scoring: only award points if selection matches AI-detected risk, based on severity
  const handleSelectionClick = (player) => {
    const selection = window.getSelection().toString().trim();
    if (!selection) return alert("გთხოვთ მონიშნეთ ტექსტი ჯერ.");
    let points = 0;
    let reason = "";
    let severity = "";
    if (aiRisks.length > 0) {
      // Find the best match (longest overlap)
      let match = null;
      let maxLen = 0;
      aiRisks.forEach(risk => {
        if (risk.text && selection && (risk.text.includes(selection) || selection.includes(risk.text))) {
          if (risk.text.length > maxLen) {
            match = risk;
            maxLen = risk.text.length;
          }
        }
      });
      if (match) {
        severity = match.severity || "";
        if (severity.toLowerCase() === "high") points = 10;
        else if (severity.toLowerCase() === "medium") points = 5;
        else if (severity.toLowerCase() === "low") points = 2;
        reason = `Correct! ${match.type} (${severity})`;
      } else {
        reason = "No risk detected for this selection.";
        alert(reason);
      }
    } else {
      reason = "Please run 'Detect Risks with AI' first.";
      alert(reason);
    }
    addPoints(player, points, reason, selection, severity);
    window.getSelection().removeAllRanges();
  };


  const sortedPlayers = Object.entries(players).sort((a, b) => b[1].score - a[1].score);
  const maxScore = Math.max(...Object.values(players).map(p => p.score), 100);

  // Onboarding submit handler
  const handleOnboardingSubmit = (e) => {
    e.preventDefault();
    // Filter out empty names, max 3
    const filtered = playerInputs.filter(p => p.name.trim() !== "").slice(0, 3);
    if (filtered.length === 0) {
      alert("Please enter at least one player name.");
      return;
    }
    // Check for duplicate names
    const names = filtered.map(p => p.name.trim());
    if (new Set(names).size !== names.length) {
      alert("Player names must be unique.");
      return;
    }
    // Build players object
    const newPlayers = {};
    filtered.forEach(p => {
      newPlayers[p.name.trim()] = { score: 0, avatar: p.avatar, badges: [] };
    });
    setPlayers(newPlayers);
    setOnboarding(false);
  };

  // Onboarding UI
  if (onboarding) {
    return (
      <div className="p-6 font-sans max-w-xl mx-auto flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold mb-4">🎮 ContractRiskBot Setup</h1>
        <form onSubmit={handleOnboardingSubmit} className="w-full flex flex-col gap-4">
          {[0,1,2].map(i => (
            <div key={i} className="flex items-center gap-3">
              <input
                type="text"
                placeholder={`Player ${i+1} Name`}
                maxLength={16}
                className="border rounded p-2 flex-1"
                value={playerInputs[i].name}
                onChange={e => {
                  const arr = [...playerInputs];
                  arr[i].name = e.target.value;
                  setPlayerInputs(arr);
                }}
              />
              <select
                className="border rounded p-2 text-2xl bg-white"
                value={playerInputs[i].avatar}
                onChange={e => {
                  const arr = [...playerInputs];
                  arr[i].avatar = e.target.value;
                  setPlayerInputs(arr);
                }}
              >
                {avatarOptions.map(av => (
                  <option key={av} value={av}>{av}</option>
                ))}
              </select>
            </div>
          ))}
          <button type="submit" className="btn btn-primary mt-2">Start Game</button>
        </form>
      </div>
    );
  }

  return (
    <div className="p-6 font-sans max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">🎮 ContractRiskBot Demo</h1>

      <h2 className="text-2xl mb-2">Upload or Paste Document</h2>
      <div className="mb-4 flex flex-col gap-2">
        <div className="flex space-x-2">
          <input type="file" accept=".txt,.md,.docx" onChange={handleFileUpload} />
          <textarea
            placeholder="Paste contract text here..."
            rows={3}
            className="border rounded p-2 flex-1"
            value={docText}
            onChange={handlePaste}
          />
        </div>
        <div className="flex space-x-2 items-center">
          <button
            className="btn btn-warning"
            onClick={handleDetectRisks}
            disabled={aiLoading || !docText}
          >
            {aiLoading ? "Detecting..." : "Detect Risks with AI"}
          </button>
        </div>
        {aiError && <div className="text-red-500 text-sm mt-1">{aiError}</div>}
      </div>
      {docText && (
        <>
          <div className="border-2 border-dashed border-gray-400 p-4 mb-2 rounded bg-gray-50" style={{ whiteSpace: 'pre-wrap', minHeight: 80 }}>
            <div className="text-xs text-gray-500 mb-1">{docName}</div>
            {docText}
          </div>
          <h2 className="text-2xl mb-1">Interactive Scoring</h2>
          <p className="mb-2">მონიშნეთ ტექსტი დოკუმენტიდან და დააჭირეთ ბატონს, რათა ქულები დაემატოს.</p>
          <div className="flex space-x-2 mb-4">
            {Object.keys(players).map(player => (
              <button
                key={player}
                onClick={() => handleSelectionClick(player)}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2"
              >
                <span>{players[player].avatar}</span>
                <span>{player}-ს ქულა მონიშვნაზე</span>
              </button>
            ))}
          </div>
        </>
      )}
      {aiRisks.length > 0 && (
        <div className="mb-4">
          {!showRisks ? (
            <button
              className="btn btn-primary"
              onClick={() => {
                setShowRisks(true);
                // Find winner
                const entries = Object.entries(players);
                const maxScore = Math.max(...entries.map(([_, p]) => p.score));
                const winners = entries.filter(([_, p]) => p.score === maxScore);
                if (winners.length > 0) {
                  setWinner(winners.map(([name]) => name));
                  setTimeout(() => {
                    confetti({
                      particleCount: 150,
                      spread: 70,
                      origin: { y: 0.6 }
                    });
                  }, 300);
                }
              }}
            >
              Reveal Answers
            </button>
          ) : (
            <>
              {winner && (
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
                  <div className="flex flex-col items-center animate-bounce" style={{ textAlign: 'center', maxWidth: 480 }}>
                    <div className="text-4xl mb-1">🏆</div>
                    <div className="text-2xl font-bold text-green-400 mb-1">
                      Winner: {Array.isArray(winner) ? winner.join(", ") : winner}
                    </div>
                    <br></br>
                    <div className="block text-xl text-gray-200 mt-2" style={{ lineHeight: 1.3, marginTop: 12 }}>
                      Congratulations!
                    </div>
                  </div>
                </div>
              )}
              <h3 className="text-xl font-bold mb-4">AI-Detected Risks</h3>
              <ul className="flex flex-col gap-5">
                {aiRisks.map((risk, idx) => (
                  <li
                    key={idx}
                    className="border border-gray-600 rounded-xl bg-[#232634] p-5 shadow-sm"
                    style={{ marginBottom: 0 }}
                  >
                    <div className="font-bold text-lg mb-2 text-white" style={{ letterSpacing: 0.2 }}>{risk.type}</div>
                    <div className="text-base text-gray-200 mb-2" style={{ whiteSpace: 'pre-wrap', fontWeight: 500 }}>{risk.text}</div>
                    <div className="text-sm text-yellow-200" style={{ whiteSpace: 'pre-wrap' }}>{risk.explanation}</div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}

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
              {entry.points > 0 ? (
                <>
                  ✅ {entry.player} +{entry.points} (Correct! {entry.reason}{entry.severity ? ` (${entry.severity} Risk)` : ""})
                </>
              ) : (
                <>
                  ❌ {entry.player} (No points: {entry.reason})
                </>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>


    </div>
  );

}
