class Game2048 {
    constructor() {
        // Initialize game board and state
        this.boardSize = 4;
        this.board = Array(this.boardSize).fill().map(() => Array(this.boardSize).fill(0));
        this.score = 0;
        this.bestScore = parseInt(localStorage.getItem('bestScore')) || 0;
        this.gameOver = false;
        this.won = false;

        // Player management
        this.players = JSON.parse(localStorage.getItem('players')) || [];

        // Start the game
        this.init();
        this.setupEventListeners();
        this.loadPlayers();
    }

    init() {
        this.updateBestScore();
        this.createBoard();
        this.addRandomTile();
        this.addRandomTile();
        this.render();
    }

    createBoard() {
        const gameBoard = document.getElementById('game-board');
        gameBoard.innerHTML = '';
        
        for (let row = 0; row < this.boardSize; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                const cell = document.createElement('div');
                cell.className = 'grid-cell';
                cell.dataset.row = row;
                cell.dataset.col = col;
                gameBoard.appendChild(cell);
            }
        }
    }

    addRandomTile() {
        const emptyCells = [];
        
        for (let row = 0; row < this.boardSize; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                if (this.board[row][col] === 0) {
                    emptyCells.push({ row, col });
                }
            }
        }

        if (emptyCells.length > 0) {
            const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            this.board[randomCell.row][randomCell.col] = Math.random() < 0.9 ? 2 : 4;
        }
    }

    render() {
        const gameBoard = document.getElementById('game-board');
        const tiles = gameBoard.querySelectorAll('.tile');
        tiles.forEach(tile => tile.remove());

        // Get the actual pixel dimensions of the game board
        const boardRect = gameBoard.getBoundingClientRect();
        const cellSize = (boardRect.width - 45) / this.boardSize; // 45px total gap (15px * 3 gaps)
        const gapSize = 15;

        for (let row = 0; row < this.boardSize; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                const value = this.board[row][col];
                if (value !== 0) {
                    const tile = document.createElement('div');
                    tile.className = `tile tile-${value}`;
                    tile.textContent = value;
                    
                    // Calculate position in pixels
                    const top = row * (cellSize + gapSize) + gapSize;
                    const left = col * (cellSize + gapSize) + gapSize;
                    
                    tile.style.top = `${top}px`;
                    tile.style.left = `${left}px`;
                    tile.style.width = `${cellSize}px`;
                    tile.style.height = `${cellSize}px`;
                    gameBoard.appendChild(tile);
                }
            }
        }

        document.getElementById('score').textContent = this.score;
        this.updateBestScore();

        if (this.gameOver) {
            this.showMessage('Game Over!', true);
        } else if (this.won) {
            this.showMessage('You Win!', false);
        }
    }

    updateBestScore() {
        if (this.score > this.bestScore) {
            this.bestScore = this.score;
            localStorage.setItem('bestScore', this.bestScore);
        }
        document.getElementById('best').textContent = this.bestScore;
    }

    showMessage(message, isGameOver) {
        const gameMessage = document.querySelector('.game-message');
        const messageText = gameMessage.querySelector('p');
        const tryAgainBtn = document.getElementById('try-again');

        messageText.textContent = message;
        gameMessage.style.display = 'flex';

        if (isGameOver) {
            tryAgainBtn.style.display = 'block';
        } else {
            tryAgainBtn.style.display = 'none';
        }
    }

    hideMessage() {
        document.querySelector('.game-message').style.display = 'none';
    }

    move(direction) {
        if (this.gameOver) return false;

        const oldBoard = JSON.parse(JSON.stringify(this.board));
        let moved = false;

        switch (direction) {
            case 'up':
                moved = this.moveUp();
                break;
            case 'down':
                moved = this.moveDown();
                break;
            case 'left':
                moved = this.moveLeft();
                break;
            case 'right':
                moved = this.moveRight();
                break;
        }

        if (moved) {
            this.addRandomTile();
            this.render();
            this.checkGameStatus();
        }

        return moved;
    }

    moveUp() {
        let moved = false;
        for (let col = 0; col < this.boardSize; col++) {
            for (let row = 1; row < this.boardSize; row++) {
                if (this.board[row][col] !== 0) {
                    let currentRow = row;
                    while (currentRow > 0 && this.board[currentRow - 1][col] === 0) {
                        this.board[currentRow - 1][col] = this.board[currentRow][col];
                        this.board[currentRow][col] = 0;
                        currentRow--;
                        moved = true;
                    }
                    if (currentRow > 0 && this.board[currentRow - 1][col] === this.board[currentRow][col]) {
                        this.board[currentRow - 1][col] *= 2;
                        this.score += this.board[currentRow - 1][col];
                        this.board[currentRow][col] = 0;
                        moved = true;
                    }
                }
            }
        }
        return moved;
    }

    moveDown() {
        let moved = false;
        for (let col = 0; col < this.boardSize; col++) {
            for (let row = this.boardSize - 2; row >= 0; row--) {
                if (this.board[row][col] !== 0) {
                    let currentRow = row;
                    while (currentRow < this.boardSize - 1 && this.board[currentRow + 1][col] === 0) {
                        this.board[currentRow + 1][col] = this.board[currentRow][col];
                        this.board[currentRow][col] = 0;
                        currentRow++;
                        moved = true;
                    }
                    if (currentRow < this.boardSize - 1 && this.board[currentRow + 1][col] === this.board[currentRow][col]) {
                        this.board[currentRow + 1][col] *= 2;
                        this.score += this.board[currentRow + 1][col];
                        this.board[currentRow][col] = 0;
                        moved = true;
                    }
                }
            }
        }
        return moved;
    }

    moveLeft() {
        let moved = false;
        for (let row = 0; row < this.boardSize; row++) {
            for (let col = 1; col < this.boardSize; col++) {
                if (this.board[row][col] !== 0) {
                    let currentCol = col;
                    while (currentCol > 0 && this.board[row][currentCol - 1] === 0) {
                        this.board[row][currentCol - 1] = this.board[row][currentCol];
                        this.board[row][currentCol] = 0;
                        currentCol--;
                        moved = true;
                    }
                    if (currentCol > 0 && this.board[row][currentCol - 1] === this.board[row][currentCol]) {
                        this.board[row][currentCol - 1] *= 2;
                        this.score += this.board[row][currentCol - 1];
                        this.board[row][currentCol] = 0;
                        moved = true;
                    }
                }
            }
        }
        return moved;
    }

    moveRight() {
        let moved = false;
        for (let row = 0; row < this.boardSize; row++) {
            for (let col = this.boardSize - 2; col >= 0; col--) {
                if (this.board[row][col] !== 0) {
                    let currentCol = col;
                    while (currentCol < this.boardSize - 1 && this.board[row][currentCol + 1] === 0) {
                        this.board[row][currentCol + 1] = this.board[row][currentCol];
                        this.board[row][currentCol] = 0;
                        currentCol++;
                        moved = true;
                    }
                    if (currentCol < this.boardSize - 1 && this.board[row][currentCol + 1] === this.board[row][currentCol]) {
                        this.board[row][currentCol + 1] *= 2;
                        this.score += this.board[row][currentCol + 1];
                        this.board[row][currentCol] = 0;
                        moved = true;
                    }
                }
            }
        }
        return moved;
    }

    checkGameStatus() {
        // Check for win
        for (let row = 0; row < this.boardSize; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                if (this.board[row][col] === 2048) {
                    this.won = true;
                    return;
                }
            }
        }

        // Check for game over
        if (this.isBoardFull() && !this.canMove()) {
            this.gameOver = true;
        }
    }

    isBoardFull() {
        for (let row = 0; row < this.boardSize; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                if (this.board[row][col] === 0) {
                    return false;
                }
            }
        }
        return true;
    }

    canMove() {
        // Check horizontal moves
        for (let row = 0; row < this.boardSize; row++) {
            for (let col = 0; col < this.boardSize - 1; col++) {
                if (this.board[row][col] === this.board[row][col + 1]) {
                    return true;
                }
            }
        }

        // Check vertical moves
        for (let col = 0; col < this.boardSize; col++) {
            for (let row = 0; row < this.boardSize - 1; row++) {
                if (this.board[row][col] === this.board[row + 1][col]) {
                    return true;
                }
            }
        }

        return false;
    }

    resetGame() {
        this.board = Array(this.boardSize).fill().map(() => Array(this.boardSize).fill(0));
        this.score = 0;
        this.gameOver = false;
        this.won = false;
        this.hideMessage();
        this.init();
    }

    setupEventListeners() {
        // Keyboard controls for game movement
        document.addEventListener('keydown', (e) => {
            if (this.gameOver) return;

            switch(e.key) {
                case 'ArrowUp':
                    e.preventDefault();
                    this.move('up');
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    this.move('down');
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    this.move('left');
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.move('right');
                    break;
            }
        });

        // New game button
        document.getElementById('new-game').addEventListener('click', () => {
            this.resetGame();
        });

        // Try again button
        document.getElementById('try-again').addEventListener('click', () => {
            this.resetGame();
        });

        // Player management buttons
        document.getElementById('add-player').addEventListener('click', () => {
            this.addPlayer();
        });

        document.getElementById('player-name').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addPlayer();
            }
        });

        document.getElementById('download-names').addEventListener('click', () => {
            this.downloadPlayerNames();
        });

        // Touch swipe support for mobile devices
        let touchStartX, touchStartY, touchEndX, touchEndY;

        document.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        }, { passive: false });

        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].clientX;
            touchEndY = e.changedTouches[0].clientY;

            const dx = touchEndX - touchStartX;
            const dy = touchEndY - touchStartY;

            if (Math.abs(dx) > Math.abs(dy)) {
                if (dx > 50) this.move('right');
                else if (dx < -50) this.move('left');
            } else {
                if (dy > 50) this.move('down');
                else if (dy < -50) this.move('up');
            }
        }, { passive: false });
    }
}

// Player management methods
Game2048.prototype.addPlayer = function() {
    const nameInput = document.getElementById('player-name');
    const name = nameInput.value.trim();

    if (name && !this.players.includes(name)) {
        this.players.push(name);
        localStorage.setItem('players', JSON.stringify(this.players));
        this.loadPlayers();
        nameInput.value = '';
        console.log(`Added player: ${name}`);
    } else if (this.players.includes(name)) {
        alert('Player name already exists!');
    } else {
        alert('Please enter a valid name!');
    }
};

Game2048.prototype.loadPlayers = function() {
    const playerList = document.getElementById('players');
    playerList.innerHTML = '';

    if (this.players.length === 0) {
        playerList.innerHTML = '<li>No players yet. Be the first!</li>';
        return;
    }

    this.players.forEach((player, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${player}`;
        playerList.appendChild(li);
    });
};

Game2048.prototype.downloadPlayerNames = function() {
    if (this.players.length === 0) {
        alert('No players to download!');
        return;
    }

    const textContent = this.players.join('\n');
    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = '2048-players.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    console.log('Downloaded player names');
};

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const game = new Game2048();
    console.log('2048 Game initialized');
});
