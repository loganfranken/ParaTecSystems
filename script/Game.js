var GAME_STATE = {

  START: 0,
  PAUSE: 1,
  PLAYING: 2,
  LEVEL_INTRO: 3

};

function Game(canvas)
{
  this.canvas = canvas;
  this.context = canvas.getContext("2d");

  this.canvasWidth = canvas.width;
  this.canvasHeight = canvas.height;

  this.isMouseDown = false;

  this.linePoints = [];

  this.nodes = [];
  this.activeNodes = [];
  this.startNode = null;
  this.endNode = null;

  this.blocks = [];

  this.currentStage = 0;
  this.loadStage(this.currentStage);

  this.displayMessage = null;
  this.displayMessageOffset = 0;

  this.currentMessageIndex = 0;
  this.messageTimer = 0;

  this.replyTimerMax = 10;
  this.replyTimer = 0;
  this.replyCount = 0;

  this.hasReplied = false;
  this.isReplyButtonDown = false;

  this.currentScore = 0;
  this.totalScore = 0;

  this.currentState = GAME_STATE.START;

  this.levelIntroTimer = 0;
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
  this.messageTimer = 0;
  this.replyTimer = 0;
  this.hasReplied = false;
}

Game.prototype.advanceStage = function()
{
  this.totalScore += this.currentScore;
  this.resetStage();
  this.currentStage++;
  this.loadStage(this.currentStage);
  this.currentState = GAME_STATE.LEVEL_INTRO;
  this.levelIntroTimer = 20;
}

Game.prototype.loadStage = function(index)
{
  this.currentScore = 1000;

  var self = this;
  var stageData = stages[index];
  var stageElements = stageData.split(';');

  var nodeRadius = self.canvasWidth * GameSettings.NodeRadiusPercentage;

  stageElements.forEach(function(elem, i) {

    var elemData = elem.split(/[,\(\)]/);

    switch(elemData[0])
    {
      // Start Node
      case 'S':
        var x = (parseInt(elemData[1], 10)/100) * self.canvasWidth;
        var y = (parseInt(elemData[2], 10)/100) * self.canvasHeight;

        self.startNode = new Node(NODE_TYPE.START, x, y);
        self.nodes.push(self.startNode);
        break;

      // End Node
      case 'E':
        var x = (parseInt(elemData[1], 10)/100) * self.canvasWidth;
        var y = (parseInt(elemData[2], 10)/100) * self.canvasHeight;

        self.endNode = new Node(NODE_TYPE.END, x, y);
        self.nodes.push(self.endNode);
        break;

      // Connecting Node
      case 'C':
        var x = (parseInt(elemData[1], 10)/100) * self.canvasWidth;
        var y = (parseInt(elemData[2], 10)/100) * self.canvasHeight;

        self.nodes.push(new Node(NODE_TYPE.CONNECT, x, y));
        break;

      // Block
      case 'B':
        var x = (parseInt(elemData[1], 10)/100) * self.canvasWidth;
        var y = (parseInt(elemData[2], 10)/100) * self.canvasHeight;

        var width = (parseInt(elemData[3], 10)/100) * self.canvasWidth;
        var height = (parseInt(elemData[4], 10)/100) * self.canvasHeight;

        self.blocks.push(new Block(x, y, width, height));
        break;
    }

  });
}

Game.prototype.update = function()
{
  if(this.currentState === GAME_STATE.LEVEL_INTRO)
  {
    if(this.levelIntroTimer <= 0)
    {
      this.currentState = GAME_STATE.PLAYING;
      return;
    }

    this.levelIntroTimer--;
    return;
  }

  if(this.currentState != GAME_STATE.PLAYING)
  {
    return;
  }

  this.currentScore--;

  if(!this.isReplyButtonDown)
  {
    this.replyTimer = 0;
  }

  // Display chat messages
  var levelMessages = messages[this.currentStage];

  if(this.currentMessageIndex >= levelMessages.length)
  {
    // All of the messages for this stage have been displayed
    return;
  }

  var currMessage = levelMessages[this.currentMessageIndex];

  if(currMessage.condition && !currMessage.condition(game))
  {
    // Condition to display message hasn't been met, skip the message
    this.currentMessageIndex++;
    return;
  }

  var prevMessage = levelMessages[this.currentMessageIndex - 1];

  if(prevMessage && prevMessage.awaitReply && !this.hasReplied)
  {
    if(this.isReplyButtonDown)
    {
      this.replyTimer++;
    }

    if(this.replyTimer > this.replyTimerMax)
    {
      this.replyCount++;
      this.hasReplied = true;
      console.log('You replied!');
    }
  }

  if(!currMessage.delay || this.messageTimer >= currMessage.delay)
  {
    // Display the message
    this.displayMessage = currMessage.content;
    this.messageTimer = 0;
    this.currentMessageIndex++;
    this.hasReplied = false;
  }
  else
  {
    this.messageTimer++;
  }

}

Game.prototype.draw = function()
{
  var self = this;
  var context = this.context;

  // DRAW: Start Screen
  if(this.currentState === GAME_STATE.START)
  {
    context.fillStyle = '#000';
    context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

    context.fillStyle = '#FFF';
    context.fillText('GAME TITLE', 100, 100);

    return;
  }

  // DRAW: Pause Screen
  if(this.currentState === GAME_STATE.PAUSE)
  {
    context.fillStyle = '#000';
    context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

    context.fillStyle = '#FFF';
    context.fillText('PAUSED', 100, 100);

    return;
  }

  // DRAW: Level Interstitial
  if(this.currentState === GAME_STATE.LEVEL_INTRO)
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

Game.prototype.resetLine = function()
{
  this.linePoints = [];
  this.activeNodes = [];
}

Game.prototype.handleMouseClick = function(game, mouseEvent)
{
  if(game.currentState === GAME_STATE.START)
  {
    this.levelIntroTimer = 20;
    game.currentState = GAME_STATE.LEVEL_INTRO;
    return;
  }

  if(game.currentState === GAME_STATE.PAUSE)
  {
    game.currentState = GAME_STATE.PLAYING;
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
  if(game.currentState === GAME_STATE.PAUSE)
  {
    game.currentState = GAME_STATE.PLAYING;
  }
  else
  {
    game.currentState = GAME_STATE.PAUSE;
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
