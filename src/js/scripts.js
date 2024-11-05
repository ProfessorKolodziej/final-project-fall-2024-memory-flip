// This is where you should write all JavaScript
// for your project. Remember a few things as you start!
// - Use let or const for all variables
// - Do not use jQuery - use JavaScript instead
// - Do not use onclick - use addEventListener instead
// - Run npm run test regularly to check autograding
// - You'll need to link this file to your HTML :)

function showScreen(screenId) {
    // 隐藏所有界面
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.style.display = 'none');

    // 显示选定的界面
    document.getElementById(screenId).style.display = 'block';
}

