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

  this.startNode = null;
  this.endNode = null;

  this.blocks = [];

  this.currentStage = 0;
  this.loadStage(this.currentStage);

  this.currentMessageIndex = 0;
}

Game.prototype.resetStage = function()
{
  this.resetLine();

  this.nodes = [];
  this.activeNodes = [];

  this.startNode = null;
  this.endNode = null;

  this.blocks = [];
  this.currentMessageIndex = 0;
}

Game.prototype.advanceStage = function()
{
  this.resetStage();
  this.currentStage++;
  this.loadStage(this.currentStage);
}

Game.prototype.loadStage = function(index)
{
  var self = this;
  var stageData = stages[index];
  var stageElements = stageData.split(';');

  stageElements.forEach(function(elem, i) {

    var elemData = elem.split(/[,\(\)]/);

    switch(elemData[0])
    {
      // Start Node
      case 'S':
        self.startNode = new Node(NODE_TYPE.START, parseInt(elemData[1], 10), parseInt(elemData[2], 10));
        self.nodes.push(self.startNode);
        break;

      // End Node
      case 'E':
        self.endNode = new Node(NODE_TYPE.END, parseInt(elemData[1], 10), parseInt(elemData[2], 10));
        self.nodes.push(self.endNode);
        break;

      // Connecting Node
      case 'C':
        self.nodes.push(new Node(NODE_TYPE.CONNECT, parseInt(elemData[1], 10), parseInt(elemData[2], 10)));
        break;

      // Block
      case 'B':
        self.blocks.push(new Block(parseInt(elemData[1], 10), parseInt(elemData[2], 10), parseInt(elemData[3], 10), parseInt(elemData[4], 10)));
        break;
    }

  });
}

Game.prototype.update = function()
{
  // Display chat messages
  var levelMessages = messages[this.currentStage];

  if(this.currentMessageIndex >= levelMessages.length)
  {
    // All of the messages for this stage have been displayed
    return;
  }

  console.log(levelMessages[this.currentMessageIndex].content);
  this.currentMessageIndex++;
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
  context.fillRect(0, 0, this.canvasWidth - 200, halfCanvasHeight);

  // Draw the bottom half
  context.fillStyle = '#333';
  context.fillRect(0, halfCanvasHeight, this.canvasWidth - 200, halfCanvasHeight);

  // Draw the chat sidebar
  context.fillStyle = '#111';
  context.fillRect(this.canvasWidth - 200, 0, 200, this.canvasHeight);

  // Draw the nodes
  this.nodes.forEach(function(node, i) {
    node.draw(context);
  });

  // Draw the blocks
  this.blocks.forEach(function(block, i) {
    block.draw(context);
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
  var mouseX = mouseEvent.clientX;
  var mouseY = mouseEvent.clientY;

  var reverseMouseX = game.canvasWidth - mouseX;
  var reverseMouseY = game.canvasHeight - mouseY;

  // Detect if user has moved outside the drawing bounds
  if(mouseY > (game.canvasHeight/2))
  {
    game.resetLine();
  }

  if(game.isMouseDown)
  {
    // Detect if user has touched any blocks
    game.blocks.forEach(function(block, i) {

      if(block.contains(mouseX, mouseY) || block.contains(reverseMouseX, reverseMouseY)) {
        game.resetLine();
      }

    });

    // Activate all nodes that the user is touching
    game.nodes.forEach(function(node, i) {

      if(game.activeNodes[i]) {
        return;
      }

      if(node.contains(mouseX, mouseY) || node.contains(reverseMouseX, reverseMouseY)) {
        game.activeNodes[i] = true;
      }

    });

    // Draw the line
    var hasLineStarted = game.linePoints.length > 0;
    if(hasLineStarted || game.activeNodes[0])
    {
      game.linePoints.push({ x: mouseX, y: mouseY });
    }

    // Get a count of active nodes
    var activeNodesCount = 0;
    game.activeNodes.forEach(function(node, i) {
      activeNodesCount++;
    });

    if(game.activeNodes[1])
    {
      if(activeNodesCount === game.nodes.length)
      {
        game.advanceStage();
      }
      else
      {
        game.resetLine();
      }
    }
  }
}
