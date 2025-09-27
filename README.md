# ContractRiskBot — Gamified Contract Risk Review App with AI Voice Feedback

## 🎯 Overview  
**ContractRiskBot** is a gamified, AI-powered web app for live contract risk review with voice feedback. Up to 3 players can join, upload or paste a contract, and compete to identify risky clauses. The app uses OpenAI to detect risks and ElevenLabs for personalized audio feedback, awarding points based on the severity of each risk found.

Perfect for hackathons, workshops, and demos — showcasing how legal tech, AI voice technology, and gamification can make contract review engaging and accessible.

---

## ✨ Features  

### 🎮 Core Game Features
- **👥 Multiplayer Setup** – Up to 3 players can enter names and choose avatars
- **📄 Document Input** – Upload a contract file or paste text directly
- **🤖 AI Risk Detection** – OpenAI analyzes the contract and flags risky clauses (e.g., Liability, Termination, Indemnification)
- **🎮 Gamified Scoring** – Players select risky text; points are awarded only if it matches AI-detected risks
  - **High severity** → 10 points
  - **Medium severity** → 5 points  
  - **Low severity** → 2 points
- **🏆 Leaderboard** – Real-time scores with avatars, milestones, and badges
- **📝 Event Log** – Tracks each attempt, showing correct vs. incorrect calls
- **🎉 Winner Reveal** – Celebratory animation at the end, plus a summary of all AI-detected risks

### 🔊 Audio Features (NEW!)
- **🎵 Personalized Voice Feedback** – ElevenLabs TTS provides immediate audio responses
- **🎉 Cheerful Congratulations** – Energetic voice celebrates correct risk identifications
- **😔 Gentle Feedback** – Empathetic voice for incorrect attempts without spoiling answers
- **🎚️ Voice Mood Settings** – Optimized voice parameters for different emotional tones
- **🔊 Manual Document Reading** – Optional feature to read entire document aloud
- **⏹️ Audio Controls** – Start/stop speaking functionality

### 💻 UI/UX Features
- **🌙 Dark Theme** – Modern, professional dark mode design
- **📱 Responsive Design** – Works on desktop and mobile devices
- **🎨 Smooth Animations** – Framer Motion animations for enhanced user experience
- **🎊 Visual Effects** – Confetti animations for celebrations

---

## 🛠️ Technology Stack

### Frontend
- **React 18.2.0** – Component-based UI with hooks
- **Vite 5.0.0** – Fast build tool and development server
- **Framer Motion 12.23.21** – Smooth animations and transitions
- **Canvas Confetti 1.9.3** – Celebratory visual effects

### APIs & Services
- **OpenAI GPT-3.5-turbo** – Contract risk analysis and clause identification
- **ElevenLabs Text-to-Speech** – High-quality voice synthesis with mood customization

### Styling & Assets
- **Custom CSS3** – Tailored dark theme with modern design
- **CSS Animations** – Pulse effects and smooth transitions

### Development Tools
- **Node.js & npm** – Package management
- **Axios 1.12.2** – HTTP client for API communications
- **Environment Variables** – Secure API key management

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- OpenAI API key
- ElevenLabs API key

### Installation

1. **Clone and install dependencies:**
   ```sh
   git clone <repository-url>
   cd contractriskbot-demo
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env` file in the project root:
   ```env
   VITE_OPENAI_API_KEY=your-openai-api-key-here
   VITE_ELEVENLABS_API_KEY=your-elevenlabs-api-key-here
   ```

3. **Start the development server:**
   ```sh
   npm run dev
   ```

4. **Open your browser:**
   Navigate to the local URL provided by Vite (typically `http://localhost:5173`)

---

## 🎲 How to Play

### Setup Phase
1. **Enter player information** – Up to 3 players can enter their names and choose avatars
2. **Upload or paste contract** – Use the file upload or text area to input your contract
3. **Run AI analysis** – Click "Detect Risks with AI" to analyze the document

### Gameplay Phase
4. **Select risky text** – Players highlight potentially risky clauses in the document
5. **Click player button** – Each player clicks their button to submit their selection
6. **Get audio feedback** – Immediate voice feedback tells you if you're correct or incorrect
   - ✅ **Correct**: "Congratulations [Player], you identified the risk correctly!"
   - ❌ **Incorrect**: "Sorry [Player], that's not a risk."
7. **Earn points** – Correct identifications earn points based on risk severity
8. **Track progress** – Watch the leaderboard update in real-time

### Conclusion Phase
9. **Reveal all answers** – Click "Reveal Answers" to see all AI-detected risks
10. **Celebrate winner** – Confetti animation and winner announcement

---

## 🔊 Audio Feedback System

The app features an intelligent voice feedback system powered by ElevenLabs:

- **Mood-Aware Voice**: Different voice settings for cheerful (correct) vs. empathetic (incorrect) responses
- **Personalized Messages**: Uses player names in feedback
- **No Spoilers**: Incorrect feedback doesn't reveal the actual risks
- **Quick Responses**: Concise, single-sentence feedback for fast gameplay
- **Voice Controls**: Manual document reading with start/stop controls

---

## 🎯 Use Cases

- **Legal Education** – Teaching contract law students about risk identification
- **Corporate Training** – Training legal teams on contract review
- **Hackathons** – Showcasing AI and voice technology integration
- **Workshops** – Interactive legal tech demonstrations
- **Accessibility** – Making legal education more accessible through audio feedback

---

## 🔧 Customization

### Voice Settings
- Modify voice parameters in the `speakText` function
- Change voice ID for different ElevenLabs voices
- Adjust stability and similarity boost for different tones

### Game Rules
- Modify scoring system in `handleSelectionClick`
- Add new risk types by updating the AI prompt
- Customize avatar options in `avatarOptions` array

### Styling
- Update `style-dark.css` for different themes
- Modify button styles and animations
- Customize color scheme and typography

---

## 📝 Development Notes

- **Frontend Demo**: This is a client-side demo designed for presentations and workshops
- **API Keys**: Store securely in environment variables (never commit to version control)
- **Production Considerations**: For production use, consider:
  - Server-side validation and security
  - Database storage for game persistence
  - User authentication and session management
  - Rate limiting for API calls
  - Error handling and fallbacks

---

## 🤝 Contributing

This project is designed for educational and demonstration purposes. Feel free to fork and customize for your specific use cases!

---

## 📄 License

This project is open source and available under the MIT License.