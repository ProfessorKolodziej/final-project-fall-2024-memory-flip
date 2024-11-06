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
