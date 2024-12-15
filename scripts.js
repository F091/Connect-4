const gameBoard = document.getElementById("game-board");
const statusDisplay = document.getElementById("status");
const resetButton = document.getElementById("reset");

const ROWS = 6;
const COLUMNS = 7;
let board = Array.from({ length: ROWS }, () => Array(COLUMNS).fill(""));
let currentPlayer = "R";

function createBoard() {
    gameBoard.innerHTML = "";
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLUMNS; col++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.row = row;
            cell.dataset.col = col;
            gameBoard.appendChild(cell);
        }
    }
}

function resetGame() {
    board = Array.from({ length: ROWS }, () => Array(COLUMNS).fill(""));
    currentPlayer = "R";
    statusDisplay.textContent = "Player R's turn";
    createBoard();
}

function checkWin(row, col, player) {
    const directions = [
        { dr: 0, dc: 1 }, { dr: 1, dc: 0 },
        { dr: 1, dc: 1 }, { dr: 1, dc: -1 }
    ];
    for (const { dr, dc } of directions) {
        let count = 1;
        for (let step = 1; step < 4; step++) {
            const r = row + dr * step;
            const c = col + dc * step;
            if (r >= 0 && r < ROWS && c >= 0 && c < COLUMNS && board[r][c] === player) {
                count++;
            } else {
                break;
            }
        }
        for (let step = 1; step < 4; step++) {
            const r = row - dr * step;
            const c = col - dc * step;
            if (r >= 0 && r < ROWS && c >= 0 && c < COLUMNS && board[r][c] === player) {
                count++;
            } else {
                break;
            }
        }
        if (count >= 4) return true;
    }
    return false;
}

gameBoard.addEventListener("click", (e) => {
    const col = e.target.dataset.col;
    if (col !== undefined) {
        for (let row = ROWS - 1; row >= 0; row--) {
            if (board[row][col] === "") {
                board[row][col] = currentPlayer;
                const cellIndex = row * COLUMNS + parseInt(col);
                gameBoard.children[cellIndex].classList.add(currentPlayer === "R" ? "red" : "yellow");
                if (checkWin(row, parseInt(col), currentPlayer)) {
                    statusDisplay.textContent = `Player ${currentPlayer} wins!`;
                    return;
                }
                currentPlayer = currentPlayer === "R" ? "Y" : "R";
                statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
                return;
            }
        }
    }
});

resetButton.addEventListener("click", resetGame);
createBoard();
