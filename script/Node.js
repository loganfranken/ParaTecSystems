var NODE_TYPE = {
  START: 0,
  END: 1,
  CONNECT: 2
};

function Node(nodeType, x, y) {

  this.type = nodeType;

  this.x = x;
  this.y = y;

  this.radius = 20;
  this.radiusSquared = (this.radius * this.radius);

}

// Draws the node to a given canvas context
Node.prototype.draw = function(context) {

  context.fillStyle = '#000';
  context.beginPath();
  context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
  context.fill();

};

// Determines if a given (x, y) coordinate is located within the Node
Node.prototype.contains = function(x, y) {

  return (Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2)) <= this.radiusSquared;

}
