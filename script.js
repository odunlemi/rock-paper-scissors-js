const log = console.log;

// Player scores
let humanScore = 0;
let computerScore = 0;

// DOM Elements
const roundResultElement = document.getElementById("round-result");
const humanScoreElement = document.getElementById("human-score");
const computerScoreElement = document.getElementById("computer-score");
const buttons = document.querySelectorAll(".choice-btn");
const resetBtn = document.getElementById("reset-btn");

// Function to get the computer choice
function getComputerChoice() {
  const randomNum = Math.random();

  if (randomNum < 0.33) return "rock";
  if (randomNum < 0.66) return "paper";
  return "scissors";
}

// Function to determine winner
function playRound(humanChoice) {
  // Stop if game is already won
  if (humanScore >= 5 || computerScore >= 5) {
    return;
  }

  const computerChoice = getComputerChoice();
  let resultMessage = "";

  if (humanChoice === computerChoice) {
    resultMessage = `It's a tie! Both chose ${humanChoice}.`;
  } else if (
    (humanChoice === "rock" && computerChoice === "scissors") ||
    (humanChoice === "paper" && computerChoice === "rock") ||
    (humanChoice === "scissors" && computerChoice === "paper")
  ) {
    resultMessage = `You win! ${humanChoice} beats ${computerChoice}.`;
    humanScore++;
  } else {
    resultMessage = `You lose! ${computerChoice} beats ${humanChoice}.`;
    computerScore++;
  }

  updateUI(resultMessage);
  checkWinner();
}

// Update UI function
function updateUI(message) {
  roundResultElement.textContent = message;
  humanScoreElement.textContent = humanScore;
  computerScoreElement.textContent = computerScore;
}

// Check for game winner
function checkWinner() {
  if (humanScore === 5) {
    roundResultElement.textContent = "Congratulations! You won the game";
    endGame();
  } else if (computerScore === 5) {
    roundResultElement.textContent = "Game over! Computer won the game.";
    endGame();
  }
}

// End game state
function endGame() {
  resetBtn.style.display = "inline-block";
  buttons.forEach((btn) => {
    if (btn.id !== "reset-btn") {
      btn.disabled = true;
      btn.style.opacity = "0.5";
      btn.style.cursor = "not-allowed";
    }
  });
}

// Reset game function
function resetGame() {
  humanScore = 0;
  computerScore = 0;
  updateUI("Choose an option to start playing.");
  resetBtn.style.display = "none";

  buttons.forEach((btn) => {
    if (btn.id !== "reset-btn") {
      btn.disabled = false;
      btn.style.opacity = "1";
      btn.style.cursor = "pointer";
    }
  });
}

// Event Listeners
buttons.forEach((button) => {
  if (button.id !== "reset-btn") {
    button.addEventListener("click", () => {
      playRound(button.id);
    });
  }
});

resetBtn.addEventListener("click", resetGame);
