function Queue() {
  this.items = [];
}
Queue.prototype.enqueue = function (newItem) {
  this.items.push(newItem);
};
Queue.prototype.dequeue = function () {
  return this.items.shift();
};
Queue.prototype.isEmpty = function () {
  return this.items.length === 0;
};

const X_MIN = 0;
const X_MAX = 3;
const Y_MIN = 0;
const Y_MAX = 3;

function isValid([x, y]) {
  return x >= X_MIN && x <= X_MAX && y >= Y_MIN && y <= Y_MAX;
}

function computeIndex([x, y]) {
  return x + y * (Y_MAX + 1);
}

function getAvailablePositions([x, y]) {
  const MOVES = [
    [2, 1],
    [2, -1],
    [1, 2],
    [1, -2],
    [-2, 1],
    [-2, -1],
    [-1, 2],
    [-1, -2],
  ];

  const availablePositions = MOVES.map((move) => {
    const moveX = move[0];
    const moveY = move[1];
    return [x + moveX, y + moveY];
  }).filter((position) => isValid(position));

  return availablePositions;
}

function buildGraph(source = [0, 0]) {
  const adjList = [];
  const queue = new Queue();
  const sourceVertex = {
    index: computeIndex(source),
    position: source,
  };
  queue.enqueue(sourceVertex);
  while (!queue.isEmpty()) {
    const currentVertex = queue.dequeue();
    const availablePositions = getAvailablePositions(currentVertex.position);
    adjList[currentVertex.index] = availablePositions.map((position) => {
      const newVertex = {
        index: computeIndex(position),
        position: position,
      };
      if (!adjList[newVertex.index]) queue.enqueue(newVertex);
      return newVertex;
    });
  }

  return adjList;
}

const adjList = buildGraph([0, 0]);
debugger;
