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
