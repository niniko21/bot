# ContractRiskBot — Gamified Contract Risk Review App  

## 🎯 Overview  
**ContractRiskBot** is a gamified, AI-powered web app for live contract risk review. Up to 3 players can join, upload or paste a contract, and compete to identify risky clauses. The app uses OpenAI to detect risks and awards points based on the severity of each risk found.  

Perfect for hackathons, workshops, and demos — showcasing how legal tech and gamification can make contract review engaging and collaborative.  

---

## ✨ Features  

- **👥 Multiplayer Setup** – Up to 3 players can enter names and choose avatars.  
- **📄 Document Input** – Upload a contract file or paste text directly.  
- **🤖 AI Risk Detection** – OpenAI analyzes the contract and flags risky clauses (e.g., Liability, Termination, Indemnification).  
- **🎮 Gamified Scoring** – Players select risky text; points are awarded only if it matches AI-detected risks.  
  - **High severity** → highest points  
  - **Medium severity** → medium points  
  - **Low severity** → fewer points  
- **🏆 Leaderboard** – Real-time scores with avatars, milestones, and badges.  
- **📝 Event Log** – Tracks each attempt, showing correct vs. incorrect calls.  
- **🎉 Winner Reveal** – Celebratory animation at the end, plus a summary of all AI-detected risks.  
- **💻 Modern UI** – Responsive, clean design with light/dark mode support.  

---

## 🚀 How to Run  

1. **Install dependencies:**  
   ```sh
   npm install ```

2. **Add your OpenAI API key
Create a .env file in the project root and add:

```VITE_OPENAI_API_KEY=your-openai-api-key```

3. **Start the development server:

```npm run dev```
Open your browser at the local URL provided by Vite.

## 🎲 How to Play

1. Enter player names and choose avatars.
2. Upload or paste a contract.
3. Click **“Detect Risks with AI”** to analyze.
4. Players take turns selecting risky clauses and clicking their **Claim** button.
5. Correct selections earn points based on severity:
   - **High severity** → highest points
   - **Medium severity** → medium points
   - **Low severity** → fewer points
6. When all risks are found, click **“Reveal Answers”** to view AI results and crown the winner.

---

## 📝 Notes

- This is a **front-end demo** designed for hackathons and workshops.
- For production use, you would typically add:
  - **Server-side logic** for handling uploads and scoring securely.
  - **Persistent storage** (database) to save game progress and player data.
  - **Secure authentication** for multiple users.
- You can **customize avatars, risk types, and scoring logic** to fit your event or demo requirements.
