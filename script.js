class MinHeap {
    constructor() {
        this.heap = [];
    }

    insert(value) {
        this.heap.push(value);
        this._heapifyUp(this.heap.length - 1);
    }

    remove() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();
        
        const root = this.heap[0];
        this.heap[0] = this.heap.pop();
        this._heapifyDown(0);
        return root;
    }

    _heapifyUp(index) {
        let parentIndex = Math.floor((index - 1) / 2);
        while (index > 0 && this.heap[index] < this.heap[parentIndex]) {
            [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
            index = parentIndex;
            parentIndex = Math.floor((index - 1) / 2);
        }
    }

    _heapifyDown(index) {
        let leftChild = 2 * index + 1;
        let rightChild = 2 * index + 2;
        let smallest = index;

        if (leftChild < this.heap.length && this.heap[leftChild] < this.heap[smallest]) {
            smallest = leftChild;
        }

        if (rightChild < this.heap.length && this.heap[rightChild] < this.heap[smallest]) {
            smallest = rightChild;
        }

        if (smallest !== index) {
            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            this._heapifyDown(smallest);
        }
    }
}

function mincost(arr) {
    if (arr.length < 2) return 0;

    const minHeap = new MinHeap();

    // Add all elements to the min-heap
    arr.forEach(value => minHeap.insert(value));

    let totalCost = 0;

    // Combine ropes until one rope is left
    while (minHeap.heap.length > 1) {
        const first = minHeap.remove();
        const second = minHeap.remove();
        
        const cost = first + second;
        totalCost += cost;
        
        minHeap.insert(cost);
    }

    return totalCost;
}

module.exports=mincost;
