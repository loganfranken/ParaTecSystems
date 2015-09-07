var gameWrapperElement = document.getElementById("game-wrapper");
var gameElement = document.getElementById("game");

gameElement.width = gameWrapperElement.clientWidth;
gameElement.height = gameWrapperElement.clientHeight;

var game = new Game(
  gameElement,
  document.getElementById("chat-sidebar"),
  document.getElementById("reply-button"),
  document.getElementById("pause-button")
);

game.start();
