function Game(canvas)
{
  this.canvas = canvas;
  this.context = canvas.getContext("2d");

  this.isMouseDown = false;
  this.linePoints = [];

  this.canvasWidth = canvas.width;
  this.canvasHeight = canvas.height;
}

Game.prototype.update = function()
{
}

Game.prototype.draw = function()
{
  var context = this.context;

  // Clear the canvas
  context.fillStyle = '#FFF';
  context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

  // Draw the user's line
  context.fillStyle = '#000';
  context.beginPath();
  context.lineWidth = 5;

  this.linePoints.forEach(function(point, i) {

    if(i === 0)
    {
      context.moveTo(point.x, point.y);
    }
    else
    {
      context.lineTo(point.x, point.y);
    }

  });

  context.lineJoin = 'round';
  context.stroke();
}

Game.prototype.start = function()
{
  var self = this;

  self.canvas.addEventListener('mousedown', function(mouseEvent) { self.handleMouseDown(self, mouseEvent) }, false);
  self.canvas.addEventListener('mouseup', function(mouseEvent) { self.handleMouseUp(self, mouseEvent) }, false);
  self.canvas.addEventListener('mousemove', function(mouseEvent) { self.handleMouseMove(self, mouseEvent) }, false);

  function loop()
  {
    self.update();
    self.draw();
  }

  window.setInterval(loop, 50);
  loop();
}

Game.prototype.handleMouseUp = function(game, mouseEvent)
{
  game.isMouseDown = false;
  game.linePoints = [];
}

Game.prototype.handleMouseDown = function(game, mouseEvent)
{
  game.isMouseDown = true;
}

Game.prototype.handleMouseMove = function(game, mouseEvent)
{
  if(game.isMouseDown)
  {
    game.linePoints.push({ x: mouseEvent.clientX, y: mouseEvent.clientY });
  }
}
