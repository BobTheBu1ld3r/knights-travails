function Queue() {
  this.items = [];
}

Queue.prototype.enqueue = (newItem) => this.items.push(newItem);
Queue.prototype.dequeue = () => this.items.shift();
Queue.prototype.isEmpty = () => this.items.length === 0;
