# 🟩 Wordle Clone

A simple browser-based Wordle clone built with TypeScript and Vite.

## Features

- Guess a random 5-letter word in 6 tries
- On-screen and physical keyboard support
- Visual feedback for correct, misplaced, and incorrect letters
- "How to Play" instructions
- Restart button

## How to Play

1. Guess the **5-letter word** in 6 tries.
2. Each guess must be a valid 5-letter word.
3. Press **Enter** (or click the on-screen Enter) to submit, and **Backspace** (or ←) to delete.
4. Tiles turn:
   - 🟩 **Green**: correct letter & position
   - 🟨 **Yellow**: correct letter, wrong position
   - ⬜ **Gray**: letter not in word

## Running Locally

### Prerequisites

- [Node.js](https://nodejs.org/) (version 16 or newer recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Setup

1. **Clone or download** this repository to your computer.
2. Open a terminal in the project folder.

3. **Install dependencies:**
   ```sh
   npm install
   ```

4. **Start the development server:**
   ```sh
   npm run dev
   ```

5. Open your browser and go to the address shown in the terminal (usually [http://localhost:5173](http://localhost:5173)).

### Build for Production

To build a static version for deployment:

```sh
npm run build
```

The output will be in the `dist/` folder.

---

Enjoy playing!