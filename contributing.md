# 🧠 How to Contribute to Old School Game

We welcome **high-quality contributions** that align with our mission: building logic-based, slow-paced, cognitive-enhancing games — not just fun distractions.

---

## ✅ What Types of Games Are Allowed?

Before you begin, please ensure your game meets ***all*** of these requirements:

### 🎯 Game Requirements:

* Must be a **brain-training game** that strengthens:

  * Logical reasoning
  * Memory (short-term, working, or long-term)
  * Attention and concentration
  * Pattern recognition
  * Strategic thinking or planning
* Must be **slow-paced and thoughtful** — games focused on fast reflexes, action, or luck will be rejected.

> ❌ **Not Accepted**: Reflex games, clicker games, flappy-bird-like mechanics, or anything that doesn't stimulate deep thinking.

---

## 📱 Responsiveness Requirement

Your game **must be fully responsive**, working from **320px (smallest phones)** to large desktops.

### 🧪 How to test responsiveness:

1. Connect your **laptop and phone to the same Wi-Fi or hotspot**.
2. Run the development server:

   ```bash
   npm run host
   ```
3. You’ll see an IP like `192.168.0.xxx:3000` in the terminal.
4. Open that IP in your phone browser to test responsiveness live during development.

---

## 📜 Required Game Documentation

Each game **must include** the following in its game page:

1. **Game Instructions**:

   * A clear, beginner-friendly section `How to Play`.
   * Use short, step-wise explanations or bullet points.

2. **Algorithm Explanation (if used)**:

   * Describe algorithms used (e.g., Backtracking, Minimax, etc.).
   * Explain how it works in simple terms.

3. **Cognitive Benefits**:

   * Detail **what part of the brain** this game improves (e.g., prefrontal cortex for planning, hippocampus for memory).
   * Explain **how it improves mental fitness** (e.g., decision-making, working memory, etc.).

4. **Scientific Backing**:

   * Link all **credible scientific study or paper** that supports the cognitive benefit you claimed.

     > 🧪 *“This game helps improve working memory and attention span, supported by [--Name-of-paper--](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8573707/).”*

---

## 🛠️ Contribution Steps

### 1. Fork and Clone

```bash
git clone https://github.com/your-username/Old-School-Game.git
cd Old-School-Game
```

### 2. Create a Branch

```bash
git checkout -b feature/my-new-game
```

### 3. Install & Run Project

Install dependencies:

```bash
npm install
```

Run dev server:

```bash
npm run dev
```

Or run with phone hosting:

```bash
npm run host
```

Open in browser: `http://localhost:3000` or your hosted IP.


### 4. Commit and Push

```bash
git add .
git commit -m "Add new brain game: [Game Name]"
git push origin feature/my-new-game
```

### 5. Open a Pull Request

Go to the main repo and click **"New Pull Request"** from your branch. Add a **detailed description** and ensure all checklist items are completed.

---

## 🧠 Final Note

Let’s build a collection that educates, sharpens, and empowers people to think deeper in an age of shallow distractions.

Your contributions matter. But quality matters more. Think slow. Build smart.
**Keep playing. Keep growing. Keep thinking. 🧠✨**
