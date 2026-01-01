const log = console.log;

// Player scores
let humanScore = 0;
let computerScore = 0;

// DOM Elements
const roundResultElement = document.getElementById("round-result");
const humanScoreElement = document.getElementById("human-score");
const computerScoreElement = document.getElementById("computer-score");
const buttons = document.querySelectorAll(".choice-btn");

// Function to get the computer choice
function getComputerChoice() {
  const randomNum = Math.random();

  if (randomNum < 0.33) {
    return "rock";
  } else if (randomNum < 0.66) {
    return "paper";
  } else {
    return "scissors";
  }
}

// Function to determine winner
function playRound(humanChoice) {
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
}

// Update UI function
function updateUI(message) {
  roundResultElement.textContent = message;
  humanScoreElement.textContent = humanScore;
  computerScoreElement.textContent = computerScore;
}

// Event Listeners
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    playRound(button.id);
  });
});
