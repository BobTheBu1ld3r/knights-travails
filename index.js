function Queue() {
  this.items = [];
}
Queue.prototype.enqueue = function (newItem) {
  this.items.push(newItem);
};
Queue.prototype.dequeue = function () {
  this.items.shift();
};
Queue.prototype.isEmpty = function () {
  return this.items.length === 0;
};

function isValid([x, y]) {
  const X_MIN = 0;
  const X_MAX = 7;
  const Y_MIN = 0;
  const Y_MAX = 7;

  return x >= X_MIN && x <= X_MAX && y >= Y_MIN && y <= Y_MAX;
}
