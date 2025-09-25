ContractRiskBot — Gamified Live Review Demo
===============================================

What this demo is:
- A self-contained, client-side demo (static HTML + JS) that simulates a gamified live contract review session.
- Load a contract (paste text or load sample), analyze/highlight clauses, join as players, start session, click clauses to claim, suggest redlines (right-click), and watch the avatar animate + leaderboard update.
- It's intentionally offline & client-only so it's safe for hackathon/demo use and quick to present without backend dependencies.

Files included:
- index.html      -> Open this file in a modern browser (Chrome/Edge/Firefox).
- README.md       -> This file.

How to run:
1. Download the zip file from this environment: contractriskbot_demo.zip
2. Unzip it locally and open index.html in your browser OR run a simple local file server (optional):
   - Python 3: `python -m http.server 8000` then open http://localhost:8000 in your browser
3. Demo tips:
   - Enter your name and click Join. Repeat in other browser windows to simulate other players.
   - Click 'Load Sample Contract' and then 'Analyze & Highlight'.
   - Click highlighted clauses to claim them (must Start Session first).
   - Right-click a clause to propose a redline suggestion (awards points if suggestion looks good).
   - Click 'Generate Session Report' to view a JSON summary.

Notes:
- This is a front-end prototype for demo purposes. For production you'd add server-side logic, persistent storage, real NLP extraction, and secure auth.
- If you want, I can extend this into a Flask/Node backend with real extraction and LLM integration next.
