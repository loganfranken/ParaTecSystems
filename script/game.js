function Game(canvas)
{
  this.canvas = canvas;
  this.context = canvas.getContext("2d");

  var canvasWidth = canvas.width;
  var canvasHeight = canvas.height;
}

Game.prototype.update = function()
{
}

Game.prototype.draw = function()
{
}

Game.prototype.start = function()
{
  var self = this;

  self.canvas.addEventListener('click', function(mouseEvent) { self.handleClick(self, mouseEvent) }, false);
  self.canvas.addEventListener('mousemove', function(mouseEvent) { self.handleMouseMove(self, mouseEvent) }, false);

  function loop()
  {
    self.update();
    self.draw();
  }

  window.setInterval(loop, 100);
  loop();
}

Game.prototype.handleClick = function(game, mouseEvent)
{
}

Game.prototype.handleMouseMove = function(game, mouseEvent)
{
}
