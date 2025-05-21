import './style.css';

// State
let WORD = '';
let currentGuess = '';
let currentRow = 0;
let gameOver = false;

const app = document.querySelector<HTMLDivElement>('#app')!;
app.innerHTML = ''; // Reset

// 🏷️ Add Title
const title = document.createElement('h1');
title.textContent = '🟩 Wordle Clone 🟨';
title.style.textAlign = 'center';
title.style.marginBottom = '10px';

// Game Grid
const grid = document.createElement('div');
grid.className = 'grid';

// Win/Lose Message
const message = document.createElement('div');
message.style.marginTop = '20px';
message.style.fontSize = '20px';
message.style.textAlign = 'center';

// 🔄 Restart Button
const restartButton = document.createElement('button');
restartButton.textContent = '🔄 Restart Game';
restartButton.className = 'key wide';
restartButton.style.display = 'block';
restartButton.style.margin = '20px auto';
restartButton.onclick = () => startGame();

// 🎮 Keyboard
const keyboard = document.createElement('div');
keyboard.className = 'keyboard';

const keyElements: Record<string, HTMLButtonElement> = {};
const keyboardLayout = [
  'QWERTYUIOP',
  'ASDFGHJKL',
  'ENTERZXCVBNM←',
];
keyboardLayout.forEach(line => {
  for (const key of line) {
    const button = document.createElement('button');
    button.className = 'key';
    button.textContent = key;
    if (key === 'ENTER' || key === '←') button.classList.add('wide');
    button.onclick = () => handleKey(key);
    keyElements[key] = button;
    keyboard.appendChild(button);
  }
});

// Create a flex container for layout
const layout = document.createElement('div');
layout.style.display = 'flex';
layout.style.justifyContent = 'center';
layout.style.alignItems = 'flex-start';
layout.style.gap = '40px'; // space between game and rules
app.appendChild(layout);

// Main game column (center)
const gameColumn = document.createElement('div');
gameColumn.style.display = 'flex';
gameColumn.style.flexDirection = 'column';
gameColumn.style.alignItems = 'center';
layout.appendChild(gameColumn);

// Move all game elements into gameColumn
gameColumn.appendChild(title);
gameColumn.appendChild(grid);
gameColumn.appendChild(message);
gameColumn.appendChild(restartButton);
gameColumn.appendChild(keyboard);

// ℹ️ Rules Section (right)
const rules = document.createElement('div');
rules.innerHTML = `
  <h2>📖 How to Play</h2>
  <ul style="text-align: left; max-width: 300px;">
    <li>Guess the <strong>5-letter word</strong> in 6 tries.</li>
    <li>Each guess must be a valid 5-letter word.</li>
    <li>Press <strong>Enter</strong> to submit, and <strong>←</strong> to delete.</li>
    <li>Tiles turn:
      <ul>
        <li><span style="color: green;">Green</span>: correct letter & position</li>
        <li><span style="color: goldenrod;">Yellow</span>: correct letter, wrong position</li>
        <li><span style="color: gray;">Gray</span>: letter not in word</li>
      </ul>
    </li>
  </ul>
`;
rules.style.marginTop = '10px';
rules.style.textAlign = 'left';
rules.style.minWidth = '320px';
layout.appendChild(rules);

// Input listener
window.addEventListener('keydown', e => {
  if (gameOver) return;
  const key = e.key.toUpperCase();
  if (key === 'BACKSPACE') handleKey('←');
  else if (key === 'ENTER') handleKey('ENTER');
  else if (/^[A-Z]$/.test(key)) handleKey(key);
});

const rows: HTMLDivElement[] = [];

async function startGame() {
  // Reset game state
  gameOver = false;
  currentGuess = '';
  currentRow = 0;
  message.textContent = '';
  keyboard.querySelectorAll('button').forEach(btn => {
    btn.classList.remove('green', 'yellow', 'gray');
  });
  grid.innerHTML = '';
  rows.length = 0;

  // Fetch a random 5-letter word
  try {
    const res = await fetch('https://random-word-api.herokuapp.com/word?length=5');
    const data = await res.json();
    WORD = data[0].toUpperCase();
    console.log('[WORDLE] Secret word is:', WORD);
  } catch {
    WORD = 'CRANE'; // fallback word
    console.warn('Failed to fetch word, using fallback.');
  }

  // Create grid
  for (let i = 0; i < 6; i++) {
    const row = document.createElement('div');
    row.className = 'row';
    for (let j = 0; j < 5; j++) {
      const tile = document.createElement('div');
      tile.className = 'tile';
      row.appendChild(tile);
    }
    rows.push(row);
    grid.appendChild(row);
  }
}

function handleKey(key: string) {
  if (gameOver) return;

  if (key === '←') {
    currentGuess = currentGuess.slice(0, -1);
  } else if (key === 'ENTER') {
    if (currentGuess.length !== 5) return;
    checkGuess(currentGuess.toUpperCase());
    currentGuess = '';
    currentRow++;
  } else if (currentGuess.length < 5 && /^[A-Z]$/.test(key)) {
    currentGuess += key;
  }
  updateGrid();
}

function updateGrid() {
  const row = rows[currentRow];
  if (!row) return;
  const letters = row.querySelectorAll<HTMLDivElement>('.tile');
  letters.forEach((tile, i) => {
    tile.textContent = currentGuess[i] ?? '';
  });
}

function checkGuess(guess: string) {
  const row = rows[currentRow];
  const tiles = row.querySelectorAll<HTMLDivElement>('.tile');
  const wordArray = WORD.split('');
  const used = Array(5).fill(false);

  guess.split('').forEach((char, i) => {
    const tile = tiles[i];
    if (char === WORD[i]) {
      tile.classList.add('green');
      keyElements[char]?.classList.add('green');
      used[i] = true;
    }
  });

  guess.split('').forEach((char, i) => {
    const tile = tiles[i];
    if (tile.classList.contains('green')) return;

    const index = wordArray.findIndex((w, j) => w === char && !used[j]);
    if (index !== -1) {
      tile.classList.add('yellow');
      keyElements[char]?.classList.add('yellow');
      used[index] = true;
    } else {
      tile.classList.add('gray');
      keyElements[char]?.classList.add('gray');
    }
  });

  if (guess === WORD) {
    endGame(true);
  } else if (currentRow === 5) {
    endGame(false);
  }
}

function endGame(win: boolean) {
  gameOver = true;
  message.textContent = win ? '🎉 You won!' : `💀 You lost! The word was: ${WORD}`;
}

// Start the game!
startGame();
