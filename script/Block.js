function Block(x, y, width, height) {

  this.x = x;
  this.y = y;

  this.width = width;
  this.height = height;

  this.leftX = x;
  this.rightX = (x + this.width);

  this.topY = y;
  this.bottomY = (y + this.height);

}

// Draws the node to a given canvas context
Block.prototype.draw = function(context) {

  context.fillStyle = "black";
  context.fillRect(this.x, this.y, this.width, this.height);

};

// Determines if a given (x, y) coordinate is located within the Block
Block.prototype.contains = function(x, y) {

  return (x > this.leftX) && (x < this.rightX) && (y > this.topY) && (y < this.bottomY);

}
