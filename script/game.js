function Game(canvas)
{
  this.canvas = canvas;
  this.context = canvas.getContext("2d");

  this.isMouseDown = false;
  this.linePoints = [];

  this.canvasWidth = canvas.width;
  this.canvasHeight = canvas.height;

  this.nodes = [];
  this.activeNodes = [];

  // Start Node
  this.startNode = new Node(NODE_TYPE.START, 100, 100);
  this.nodes.push(this.startNode);

  // End Node
  this.endNode = new Node(NODE_TYPE.END, 800, 100);
  this.nodes.push(this.endNode);

  // Connecting Nodes
  this.nodes.push(new Node(NODE_TYPE.CONNECT, 200, 200));
  this.nodes.push(new Node(NODE_TYPE.CONNECT, 500, 200));

}

Game.prototype.update = function()
{
}

Game.prototype.draw = function()
{
  var self = this;
  var context = this.context;

  // Clear the canvas
  context.fillStyle = '#FFF';
  context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

  var halfCanvasHeight = this.canvasHeight/2;

  // Draw the top half
  context.fillStyle = '#FFF';
  context.fillRect(0, 0, this.canvasWidth, halfCanvasHeight);

  // Draw the bottom half
  context.fillStyle = '#333';
  context.fillRect(0, halfCanvasHeight, this.canvasWidth, halfCanvasHeight);

  // Draw the start node
  this.nodes.forEach(function(node, i) {
    node.draw(context);
  });

  // Draw the user's line
  context.strokeStyle = '#000';
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

  // Draw the reverse of the user's line
  context.strokeStyle = '#FFF';
  context.beginPath();
  context.lineWidth = 5;

  this.linePoints.forEach(function(point, i) {

    var x = self.canvasWidth - point.x;
    var y = self.canvasHeight - point.y;

    if(i === 0)
    {
      context.moveTo(x, y);
    }
    else
    {
      context.lineTo(x, y);
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

Game.prototype.resetLine = function()
{
  this.linePoints = [];
  this.activeNodes = [];
}

Game.prototype.handleMouseUp = function(game, mouseEvent)
{
  game.isMouseDown = false;
  game.resetLine();
}

Game.prototype.handleMouseDown = function(game, mouseEvent)
{
  game.isMouseDown = true;
}

Game.prototype.handleMouseMove = function(game, mouseEvent)
{
  if(mouseEvent.clientY > (game.canvasHeight/2))
  {
    game.resetLine();
  }

  var hasLineStarted = game.linePoints.length > 0;

  if(game.isMouseDown)
  {
    // Activate all nodes that the user is touching
    game.nodes.forEach(function(node, i) {

      if(game.activeNodes[i]) {
        return;
      }

      if(node.contains(mouseEvent.clientX, mouseEvent.clientY)) {
        game.activeNodes[i] = true;
      }

    });

    if(hasLineStarted || game.activeNodes[0])
    {
      game.linePoints.push({ x: mouseEvent.clientX, y: mouseEvent.clientY });
    }

    var activeNodesCount = 0;
    game.activeNodes.forEach(function(node, i) {
      activeNodesCount++;
    });

    if(game.activeNodes[1])
    {
      if(activeNodesCount === game.nodes.length)
      {
        console.log("You've won!")
      }
      else
      {
        game.resetLine();
      }
    }
  }
}
