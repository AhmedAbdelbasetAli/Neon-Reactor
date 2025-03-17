let score = 0;
let gameActive = false;
let timeLeft = 30;
let timerId = null;

const gameArea = document.getElementById('gameArea');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const gameOverScreen = document.getElementById('gameOver');
const resultTitle = document.getElementById('resultTitle');
const finalScoreElement = document.getElementById('finalScore');

function createTarget() {
    const target = document.createElement('div');
    target.className = 'target';
    target.style.left = `${Math.random() * (gameArea.offsetWidth - 60)}px`;
    target.style.top = `${Math.random() * (gameArea.offsetHeight - 60)}px`;
    
    target.addEventListener('click', () => {
        if (!gameActive) return;
        score++;
        scoreElement.textContent = score;
        createParticles(target);
        target.remove();
        
        // Win condition
        if (score >= 30) {
            endGame(true);
        } else {
            setTimeout(createTarget, 500);
        }
    });

    gameArea.appendChild(target);
}

function createParticles(element) {
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${element.offsetLeft + 30}px`;
        particle.style.top = `${element.offsetTop + 30}px`;
        gameArea.appendChild(particle);
        setTimeout(() => particle.remove(), 500);
    }
}

function updateTimer() {
    timeLeft--;
    timerElement.textContent = timeLeft;
    
    if (timeLeft <= 0) {
        endGame(false);
    }
}

function endGame(isWin) {
    gameActive = false;
    clearInterval(timerId);
    gameArea.innerHTML = '';
    gameOverScreen.style.display = 'grid';
    
    if (isWin) {
        resultTitle.className = 'win-message';
        resultTitle.textContent = 'YOU WIN!';
    } else {
        resultTitle.className = 'lose-message';
        resultTitle.textContent = 'GAME OVER';
    }
    
    finalScoreElement.textContent = score;
}

function startGame() {
    // Reset game state
    gameActive = true;
    score = 0;
    timeLeft = 30;
    scoreElement.textContent = '0';
    timerElement.textContent = '30';
    gameArea.innerHTML = '';
    gameOverScreen.style.display = 'none';
    
    // Start game loop
    createTarget();
    timerId = setInterval(updateTimer, 1000);
    
    // Auto-end after 30 seconds
    setTimeout(() => {
        if (gameActive) endGame(false);
    }, 30000);
}

// Start the game when page loads
startGame();
