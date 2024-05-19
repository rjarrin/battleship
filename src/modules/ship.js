class Ship {
    constructor(type, length, hits = 0) {
        // Validating the length parameter to ensure it's a positive integer.
        if (typeof length !== 'number' || length <= 0) {
            throw new Error('Ship length must be a positive integer.');
        }
        this.type = type;
        this.length = length;
        this.hits = hits;
        this.sunked = false;
    }

    // Increment the number of hits taken by enemy ship
    hit() {
        this.hits += 1;
        return true;
    }

    // Calculate whether a ship is sunk based on its length and number of hits received
    isSunk() {
        // Checking if the ship is sunk (i.e., the number of hits equals the length of the ship).
        if (this.hits === this.length) {
            this.sunked = true;
            return true;
        }
        return false;
    }
}

export default Ship;
