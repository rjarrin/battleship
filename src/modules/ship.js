class Ship {
    constructor(length, hits) {
        this.length = length;
        this.hits = hits;
        this.sunked = false;
    }

    // Increment the number of hits taken by enemy ship
    hit() {
        this.hits += 1;
        return;
    }

    // Calculate whether a ship is sunk based on its length and number of hits received
    isSunk() {
        if(this.hits === this.length) this.sunked = true;
        return;
    }
}

export default Ship;