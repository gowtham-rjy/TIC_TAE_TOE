const cells = document.querySelectorAll('[data-cell]');
const gameStatus = document.getElementById('gameStatus');
const restartButton = document.getElementById('restartButton');
let currentPlayer = 'X';
let gameActive = true;
let board = ['', '', '', '', '', '', '', '', ''];

// Define all possible winning combinations for a 3x3 board
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Add click event listeners to each cell
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(cell, index));
});

restartButton.addEventListener('click', restartGame);

function handleCellClick(cell, index) {
    // Only allow clicks on empty cells when the game is active
    if (board[index] !== '' || !gameActive) return;

    // Update the cell and the board state
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    // Check for a winner or draw
    if (checkWinner()) {
        gameStatus.textContent = `Player ${currentPlayer} Wins!`;
        gameActive = false;
    } else if (!board.includes('')) {
        gameStatus.textContent = "It's a Draw!";
        gameActive = false;
    } else {
        // Switch players
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        gameStatus.textContent = `Player ${currentPlayer}'s Turn`;
    }
}

function checkWinner() {
    // Check each winning combination for a win
    for (const combo of winningCombinations) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            // Highlight the winning cells
            highlightWinningCells(combo);
            return true;
        }
    }
    return false;
}

function highlightWinningCells(combo) {
    // Add the winning cell animation to the winning combination
    combo.forEach(index => {
        cells[index].classList.add('winning-cell');
    });
}

function restartGame() {
    // Reset game variables and UI for a new game
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    gameStatus.textContent = `Player X's Turn`;

    // Clear all cell contents and remove winning cell styling
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('winning-cell');
    });
}
