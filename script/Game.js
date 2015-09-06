/**
 * The game
 * @constructor
 * @param {HTMLCanvasElement} canvas  - Canvas for displaying the game
 */
function Game(canvas)
{
  // Properties: Canvas
  this.canvas = canvas;
  this.context = canvas.getContext("2d");
  this.canvasWidth = canvas.width;
  this.canvasHeight = canvas.height;

  // Properties: Game
  this.currentState = GameState.Starting;

  // Properties: User Mouse
  this.isMouseDown = false;

  // Properties: Line
  this.linePoints = [];

  // Properties: Nodes
  this.nodes = [];
  this.activeNodes = [];
  this.startNode = null;
  this.endNode = null;
  this.nodeRadius = this.canvasWidth * GameSettings.NodeRadiusPercentage;

  // Properties: Blocks
  this.blocks = [];

  // Properties: Stages
  this.currentStage = 0;
  this.loadStage(this.currentStage);
  this.stageIntroTimer = 0;

  // Properties: Messages
  this.displayMessage = null;
  this.displayMessageOffset = 0;
  this.currentMessageIndex = 0;
  this.messageTimer = 0;

  // Properties: Message Replies
  this.replyTimerMax = GameSettings.ReplyTimerMax;
  this.replyTimer = 0;
  this.replyCount = 0;
  this.hasReplied = false;
  this.isReplyOptionActive = false;

  // Properties: Score
  this.currentScore = 0;
  this.totalScore = 0;
}

/**
 * Resets the game to a state before a stage begins
 */
Game.prototype.resetStage = function()
{
  // Reset lines
  this.resetLine();

  // Reset nodes
  this.nodes = [];
  this.activeNodes = [];
  this.startNode = null;
  this.endNode = null;

  // Reset blocks
  this.blocks = [];

  // Reset messages
  this.currentMessageIndex = 0;
  this.messageTimer = 0;
  this.replyTimer = 0;
  this.hasReplied = false;

  // Reset score
  this.currentScore = GameSettings.StageScoreStart;
}

/**
 * Resets a line to a state before it was drawn
 */
Game.prototype.resetLine = function()
{
  this.linePoints = [];
  this.activeNodes = [];
}

/**
 * Advances the user to the next stage
 */
Game.prototype.advanceStage = function()
{
  this.totalScore += this.currentScore;

  this.resetStage();

  this.currentStage++;
  this.loadStage(this.currentStage);

  this.currentState = GameState.StartingStage;
  this.stageIntroTimer = GameSettings.StageIntroTimerMax;
}

/**
 * Loads the stage corresponding to the specified index
 * @param {integer} index  - Index of the stage to load
 */
Game.prototype.loadStage = function(index)
{
  function calcRelativeValue(percentage, context) {
    return (parseInt(percentage, 10)/100) * context;
  }

  var self = this;
  var stageData = stages[index];
  var stageElements = stageData.split(';');

  stageElements.forEach(function(elem, i) {

    var elemData = elem.split(/[,\(\)]/);

    var key = elemData[0];
    var x = calcRelativeValue(elemData[1], self.canvasWidth);
    var y = calcRelativeValue(elemData[2], self.canvasHeight);

    switch(key)
    {
      // Start Node
      case 'S':
        self.startNode = new Node(NodeType.Start, x, y, self.nodeRadius);
        self.nodes.push(self.startNode);
        break;

      // End Node
      case 'E':
        self.endNode = new Node(NodeType.End, x, y, self.nodeRadius);
        self.nodes.push(self.endNode);
        break;

      // Connecting Node
      case 'C':
        self.nodes.push(new Node(NodeType.Connect, x, y, self.nodeRadius));
        break;

      // Block
      case 'B':
        var width = calcRelativeValue(elemData[3], self.canvasWidth);
        var height = calcRelativeValue(elemData[4], self.canvasHeight);

        self.blocks.push(new Block(x, y, width, height));
        break;
    }

  });
}

/**
 * Updates the game's states
 */
Game.prototype.update = function()
{
  // STATE: Stage interstitial
  if(this.currentState === GameState.StartingStage)
  {
    if(this.stageIntroTimer <= 0)
    {
      this.currentState = GameState.Playing;
      return;
    }

    this.stageIntroTimer--;
    return;
  }

  // STATE: Paused
  if(this.currentState != GameState.Playing)
  {
    return;
  }

  // Update score
  this.currentScore--;

  this.updateMessages();

}

Game.prototype.updateMessages = function()
{
  if(!this.isReplyOptionActive)
  {
    this.replyTimer = 0;
  }

  // Display chat messages
  var levelMessages = messages[this.currentStage];

  if(!levelMessages)
  {
    return;
  }

  if(this.currentMessageIndex >= levelMessages.length)
  {
    // All of the messages for this stage have been displayed
    return;
  }

  var currMessage = levelMessages[this.currentMessageIndex];

  // CHECK: Current message display condition
  if(currMessage.condition && !currMessage.condition(game))
  {
    // Condition to display message hasn't been met, skip the message
    this.currentMessageIndex++;
    return;
  }

  // CHECK: Previous message reply
  var prevMessage = levelMessages[this.currentMessageIndex - 1];

  if(prevMessage && prevMessage.awaitReply && !this.hasReplied)
  {
    if(this.isReplyOptionActive)
    {
      this.replyTimer++;
    }

    if(this.replyTimer > this.replyTimerMax)
    {
      this.replyCount++;
      this.hasReplied = true;
    }
  }

  if(!currMessage.delay || this.messageTimer >= currMessage.delay)
  {
    // Prepare the message for display
    this.displayMessage = currMessage.content;
    this.messageTimer = 0;
    this.currentMessageIndex++;
    this.hasReplied = false;
    return;
  }

  this.messageTimer++;
}

Game.prototype.draw = function()
{
  var self = this;
  var context = this.context;

  // DRAW: Start Screen
  if(this.currentState === GameState.Starting)
  {
    context.fillStyle = '#000';
    context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

    context.fillStyle = '#FFF';
    context.fillText('GAME TITLE', 100, 100);

    return;
  }

  // DRAW: Pause Screen
  if(this.currentState === GameState.Paused)
  {
    context.fillStyle = '#000';
    context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

    context.fillStyle = '#FFF';
    context.fillText('PAUSED', 100, 100);

    return;
  }

  // DRAW: Level Interstitial
  if(this.currentState === GameState.StartingStage)
  {
    context.fillStyle = '#000';
    context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

    context.fillStyle = '#FFF';
    context.fillText('STARTING A LEVEL', 100, 100);

    return;
  }

  // DRAW: Playing

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

  // Score
  context.fillStyle = '#000';
  context.fillText("TOTAL SCORE: " + this.totalScore, 10, 20);
  context.fillText("STAGE SCORE: " + this.currentScore, 10, 40);

  if(this.displayMessage)
  {
    document.getElementById('chat-sidebar').innerHTML += this.displayMessage;
    this.displayMessage = null;
  }

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
  self.canvas.addEventListener('click', function(mouseEvent) { self.handleMouseClick(self, mouseEvent) }, false);

  document.getElementById('reply-button').addEventListener('mousedown', function(mouseEvent) { self.handleReplyButtonMouseDown(self, mouseEvent) }, false);
  document.getElementById('reply-button').addEventListener('mouseup', function(mouseEvent) { self.handleReplyButtonMouseUp(self, mouseEvent) }, false);

  document.getElementById('pause-button').addEventListener('click', function(mouseEvent) { self.handlePauseButtonClick(self, mouseEvent) }, false);

  function loop()
  {
    self.update();
    self.draw();
  }

  this.currentScore = 1000;

  window.setInterval(loop, 50);
  loop();
}

Game.prototype.handleMouseClick = function(game, mouseEvent)
{
  if(game.currentState === GameState.Starting)
  {
    this.stageIntroTimer = 20;
    game.currentState = GameState.StartingStage;
    return;
  }

  if(game.currentState === GameState.Paused)
  {
    game.currentState = GameState.Playing;
    return;
  }
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

Game.prototype.handleReplyButtonMouseUp = function(game, mouseEvent)
{
  game.isReplyButtonDown = false;
}

Game.prototype.handleReplyButtonMouseDown = function(game, mouseEvent)
{
  game.isReplyButtonDown = true;
}

Game.prototype.handlePauseButtonClick = function(game, mouseEvent)
{
  if(game.currentState === GameState.Paused)
  {
    game.currentState = GameState.Playing;
  }
  else
  {
    game.currentState = GameState.Paused;
  }
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
