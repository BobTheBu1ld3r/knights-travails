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
const X_MAX = 7;
const Y_MIN = 0;
const Y_MAX = 7;

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

function doBFS(source = [0, 0], adjList) {
  const bfsInfo = [];
  for (let i = 0; i < adjList.length; i++) {
    bfsInfo[i] = {
      distance: null,
      predecessor: null,
    };
  }
  const queue = new Queue();
  const sourceInfo = {
    distance: 0,
    predecessor: null,
  };
  const sourceIndex = computeIndex(source);

  bfsInfo[sourceIndex] = sourceInfo;

  queue.enqueue({ index: computeIndex(source), position: source });

  while (!queue.isEmpty()) {
    const current = queue.dequeue();
    const unvisitedNeighbours = adjList[current.index].filter((neighbour) => {
      return bfsInfo[neighbour.index].distance === null;
    });
    unvisitedNeighbours.forEach((neighbour) => {
      currentInfo = bfsInfo[current.index];
      bfsInfo[neighbour.index].distance = currentInfo.distance + 1;
      bfsInfo[neighbour.index].predecessor = current;
      queue.enqueue(neighbour);
    });
  }

  return bfsInfo;
}

function knightMoves(start, end) {
  const bfsInfo = doBFS(end, adjList);
  const startIndex = computeIndex(start);
  const path = [start];
  currentIndex = startIndex;
  while (bfsInfo[currentIndex].predecessor !== null) {
    currentVertex = bfsInfo[currentIndex].predecessor;
    currentIndex = currentVertex.index;
    path.push(currentVertex.position);
  }
  return path;
}

const path = knightMoves([0, 0], [7, 7]);
console.log(path);
