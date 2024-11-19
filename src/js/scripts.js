// This is where you should write all JavaScript
// for your project. Remember a few things as you start!
// - Use let or const for all variables
// - Do not use jQuery - use JavaScript instead
// - Do not use onclick - use addEventListener instead
// - Run npm run test regularly to check autograding
// - You'll need to link this file to your HTML :)

document.addEventListener("DOMContentLoaded", () => {
	const pages = document.querySelectorAll('.page');
	let currentPage = 0;

	function showPage(index) {
		pages.forEach((page, i) => {
			page.style.display = i === index ? 'block' : 'none';
		});
	}

	document.addEventListener("click", () => {
		if (currentPage < pages.length - 1) {
			currentPage++;
			showPage(currentPage);
		}
	});

	showPage(currentPage);
});

function startGame(level) {
	if (level === 'easy') {
		alert('You have selected Easy mode. You will have 1 minute to complete the game!');
	} else if (level === 'hard') {
		alert('You have selected Hard mode. You will have 30 seconds to complete the game!');
	}
	// Add logic to initialize the game based on the level
}

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let timer;
let remainingTime;

// Initialize the game
window.addEventListener('DOMContentLoaded', () => {
	const cards = document.querySelectorAll('.memory-card');
	const timerDisplay = document.getElementById('timer');

	// Shuffle cards
	(function shuffle() {
		cards.forEach(card => {
			let randomPos = Math.floor(Math.random() * 18);
			card.style.order = randomPos;
		});
	})();

	// Add event listeners to cards
	cards.forEach(card => card.addEventListener('click', flipCard));

	// Start timer based on difficulty
	const level = window.sessionStorage.getItem('difficulty'); // Assuming difficulty is stored in session
	if (level === 'easy') {
		remainingTime = 60;
	} else {
		remainingTime = 30;
	}
	startTimer(timerDisplay);
});

function flipCard() {
	if (lockBoard) return;
	if (this === firstCard) return;

	this.classList.add('flipped');

	if (!hasFlippedCard) {
		// First card clicked
		hasFlippedCard = true;
		firstCard = this;
		return;
	}

	// Second card clicked
	secondCard = this;
	checkForMatch();
}

function checkForMatch() {
	let isMatch = firstCard.querySelector('.front-face').src === secondCard.querySelector('.front-face').src;

	if (isMatch) {
		disableCards();
		checkForWin();
	} else {
		unflipCards();
	}
}

function disableCards() {
	firstCard.removeEventListener('click', flipCard);
	secondCard.removeEventListener('click', flipCard);

	resetBoard();
}

function unflipCards() {
	lockBoard = true;

	setTimeout(() => {
		firstCard.classList.remove('flipped');
		secondCard.classList.remove('flipped');

		resetBoard();
	}, 500);
}

function resetBoard() {
	[hasFlippedCard, lockBoard] = [false, false];
	[firstCard, secondCard] = [null, null];
}

function startTimer(timerDisplay) {
	timerDisplay.innerHTML = `Time: ${remainingTime}s`;
	timer = setInterval(() => {
		remainingTime--;
		timerDisplay.innerHTML = `Time: ${remainingTime}s`;

		if (remainingTime === 0) {
			clearInterval(timer);
			checkForWin(true); // Force check for win due to timeout
		}
	}, 1000);
}

function checkForWin(timeout = false) {
	const allCards = document.querySelectorAll('.memory-card');
	const allFlipped = [...allCards].every(card => card.classList.contains('flipped'));

	if (allFlipped) {
		clearInterval(timer);
		setTimeout(() => {
			alert('Hooray! YOU WIN!');
		}, 100);
	} else if (timeout) {
		setTimeout(() => {
			alert('Oh no! DON’T GIVE UP!');
		}, 100);
	}
}
