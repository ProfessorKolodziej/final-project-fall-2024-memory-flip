// This is where you should write all JavaScript
// for your project. Remember a few things as you start!
// - Use let or const for all variables
// - Do not use jQuery - use JavaScript instead
// - Do not use onclick - use addEventListener instead
// - Run npm run test regularly to check autograding
// - You'll need to link this file to your HTML :)

document.addEventListener("DOMContentLoaded", () => {
	// Variables for page navigation
	const pages = document.querySelectorAll(".page");
	let currentPage = 0;

	function showPage(index) {
		pages.forEach((page, i) => {
			page.style.display = i === index ? "block" : "none";
		});

		if (index === 3) {
			startTimer(document.getElementById("timer"));
		} else {
			stopTimer();
		}
	}

	// General navigation for all pages except the 'mode' page
	document.addEventListener("click", (event) => {
		// Check if we are on the 'mode' page
		if (currentPage === 2) {
			return; // Do not navigate away unless a difficulty button is clicked
		}

		if (currentPage < pages.length - 1) {
			currentPage++;
			showPage(currentPage);
		}
	});

	// Difficulty buttons specifically for 'mode' page
	const easyButton = document.querySelector(".level-button.easy");
	const hardButton = document.querySelector(".level-button.hard");

	easyButton.addEventListener("click", () => {
		window.sessionStorage.setItem("difficulty", "easy");
		currentPage++;
		showPage(currentPage);
		startGame("easy");
	});

	hardButton.addEventListener("click", () => {
		window.sessionStorage.setItem("difficulty", "hard");
		currentPage++;
		showPage(currentPage);
		startGame("hard");
	});

	showPage(currentPage);
});

function startGame(level) {
	if (level === "easy") {
		alert("You have selected Easy mode. You will have 1 minute to complete the game!");
	} else if (level === "hard") {
		alert("You have selected Hard mode. You will have 30 seconds to complete the game!");
	}

	// Start the game and set the timer
	showPage(3); // Assuming the 'game' section is the fourth page
}

// Variables for the memory game
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let timer;
let remainingTime;

// Initialize the game
window.addEventListener("DOMContentLoaded", () => {
	const cards = document.querySelectorAll(".memory-card");

	// Shuffle cards
	(function shuffle() {
		cards.forEach((card) => {
			let randomPos = Math.floor(Math.random() * 18);
			card.style.order = randomPos;
		});
	})();

	// Add event listeners to cards
	cards.forEach((card) => card.addEventListener("click", flipCard));
});

function flipCard() {
	if (lockBoard) return;
	if (this === firstCard) return;

	this.classList.add("flipped");

	if (!hasFlippedCard) {
		hasFlippedCard = true;
		firstCard = this;
		return;
	}

	secondCard = this;
	checkForMatch();
}

function checkForMatch() {
	let isMatch =
		firstCard.querySelector(".front-face").alt ===
		secondCard.querySelector(".front-face").alt;

	if (isMatch) {
		disableCards();
		checkForWin();
	} else {
		unflipCards();
	}
}

function disableCards() {
	firstCard.removeEventListener("click", flipCard);
	secondCard.removeEventListener("click", flipCard);
	resetBoard();
}

function unflipCards() {
	lockBoard = true;

	setTimeout(() => {
		firstCard.classList.remove("flipped");
		secondCard.classList.remove("flipped");
		resetBoard();
	}, 500);
}

function resetBoard() {
	[hasFlippedCard, lockBoard] = [false, false];
	[firstCard, secondCard] = [null, null];
}

function startTimer(timerDisplay) {
	if (timer) {
		clearInterval(timer);
	}

	const difficulty = window.sessionStorage.getItem("difficulty");
	remainingTime = difficulty === "easy" ? 60 : 30;

	timerDisplay.innerHTML = `Time: ${remainingTime}s`;
	timer = setInterval(() => {
		remainingTime--;
		timerDisplay.innerHTML = `Time: ${remainingTime}s`;

		if (remainingTime === 0) {
			clearInterval(timer);
			if (![...document.querySelectorAll(".memory-card")].every(card => card.classList.contains("flipped"))) {
				setTimeout(() => {
					alert("Oh no! DON’T GIVE UP!");
				}, 100);
			}
		}
	}, 1000);
}

function stopTimer() {
	if (timer) {
		clearInterval(timer);
	}
}

// Quit and Restart button functionality
const quitButton = document.getElementById("quit-button");
const restartButton = document.getElementById("restart-button");
const cards = document.querySelectorAll(".memory-card");

quitButton.addEventListener("click", () => {
	if (confirm("Are you sure you want to quit the game?")) {
		resetGame();
		window.location.reload();
	}
});

restartButton.addEventListener("click", () => {
	if (confirm("Do you want to restart the game?")) {
		resetGame();
	}
});

function resetGame() {
	hasFlippedCard = false;
	lockBoard = false;
	firstCard = null;
	secondCard = null;

	cards.forEach((card) => {
		card.classList.remove("flipped");
		card.addEventListener("click", flipCard);
	});

	shuffle();
	stopTimer();

	const difficulty = window.sessionStorage.getItem("difficulty");
	remainingTime = difficulty === "easy" ? 60 : 30;
	startTimer(document.getElementById("timer"));
}

function shuffle() {
	cards.forEach((card) => {
		let randomPos = Math.floor(Math.random() * 18);
		card.style.order = randomPos;
	});
}

const musicToggleButton = document.getElementById("music-toggle-button");
const musicIcon = document.getElementById("music-icon");
const bgm = document.getElementById("bgm");
let isPlaying = false;

// Event listener for music toggle button
musicToggleButton.addEventListener("click", () => {
	if (isPlaying) {
		// Pause the background music
		bgm.pause();
		musicIcon.src = "images/musicoff.png";
		musicIcon.alt = "Music Off";
	} else {
		// Play the background music
		bgm.play();
		musicIcon.src = "images/musicon.png";
		musicIcon.alt = "Music On";
	}
	isPlaying = !isPlaying;
});
