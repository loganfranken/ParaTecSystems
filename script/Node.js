var NODE_TYPE = {
  START: 0,
  END: 1,
  CONNECT: 2
};

function Node(nodeType, x, y) {

  this.type = nodeType;
  this.x = x;
  this.y = y;

}

Node.prototype.draw = function(context, x, y) {

  context.fillStyle = '#000';
  context.beginPath();
  context.arc(this.x, this.y, 20, 0, 2 * Math.PI);
  context.fill();

};
