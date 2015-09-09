/**
 * A block that prevents
 * @constructor
 * @param {NodeType}  nodeType  - The node's type
 * @param {integer}   x         - X-coordinate of the block
 * @param {integer}   y         - Y-cooridnate of the block
 * @param {integer}   radius    - Radius of the node
 */
function Node(nodeType, x, y, radius) {

  this.type = nodeType;

  this.x = x;
  this.y = y;

  this.radius = radius;
  this.radiusSquared = (this.radius * this.radius);

}

/**
 * Renders the node
 * @param {CanvasRenderingContext2D}  context - 2D rendering context to use when rendering the node
 */
Node.prototype.draw = function(context) {

  // Draw: Base Color
  switch(this.type)
  {
    case NodeType.Start:
      context.fillStyle = GameSettings.NodeStartFillStyle;
      break;

    case NodeType.End:
      context.fillStyle = GameSettings.NodeEndFillStyle;
      break;

    case NodeType.Connect:
      context.fillStyle = GameSettings.NodeConnectFillStyle;
      break;
  }

  context.beginPath();
  context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
  context.fill();

  if(this.type === NodeType.End)
  {
    context.strokeStyle = '#000';
    context.beginPath();
    context.lineWidth = 5;

    var radiusDiff = (this.radius - 15);

    context.moveTo(this.x - radiusDiff, this.y - radiusDiff);
    context.lineTo(this.x + radiusDiff, this.y + radiusDiff);

    context.moveTo(this.x + radiusDiff, this.y - radiusDiff);
    context.lineTo(this.x - radiusDiff, this.y + radiusDiff);

    context.stroke();
  }
  else if(this.type === NodeType.Start)
  {
    context.strokeStyle = '#000';
    context.lineWidth = 5;

    context.beginPath();
    context.arc(this.x, this.y, this.radius - 10, 0, 2 * Math.PI);
    context.stroke();
  }
  else if(this.type === NodeType.Connect)
  {
    context.strokeStyle = '#000';
    context.beginPath();
    context.lineWidth = 5;

    var radiusDiff = (this.radius - 10);

    context.moveTo(this.x - radiusDiff, this.y);
    context.lineTo(this.x + radiusDiff, this.y);

    context.stroke();
  }

};

/**
 * Determines if a given point is within the node
 * @param {integer} x       - X-coordinate of the point
 * @param {integer} y       - Y-cooridnate of the point
 */
Node.prototype.contains = function(x, y) {

  // Source: http://stackoverflow.com/questions/481144/equation-for-testing-if-a-point-is-inside-a-circle
  return (Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2)) <= this.radiusSquared;

}
