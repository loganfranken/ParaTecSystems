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
