var canvas = q('canvas1');
var ctx = canvas.getContext('2d');

canvas.width = 1*window.innerWidth;
canvas.height = 1*window.innerHeight;

var cvsWidth = canvas.width;
var cvsHeight = canvas.height;

hideMenu();
Game.startGame();

//---------------------------
function showMenu() {
    q('menuDiv').style.display = 'flex';
    q('scoreLab').innerHTML = Game.score;
}

function hideMenu() {
    q('menuDiv').style.display = 'none';
}

q('restartBtn').onclick = function() {
    hideMenu();
    Game.endGame();
    Game.startGame();
};