import Ship from './ship';

class Gameboard {
    constructor(size) {
        this.size = size;
        this.board = Gameboard.createBoard(size);
        this.missedAttacks = [];
    }

    // Initialize a 2D array with the given size, filled with null
    static createBoard(size) {
        const board = new Array(size)
            .fill(null)
            .map(() => new Array(size).fill(null));
        return board;
    }

    // Helper to check if chip can be placed in a given position
    canPlaceShip(ship, x, y, orientation) {
        // Iterate over the length of the ship to check each segment
        for (let i = 0; i < ship.length; i += 1) {
            // Calculate the new position based on the orientation
            const newX = orientation === 'horizontal' ? x + i : x;
            const newY = orientation === 'vertical' ? y + i : y;

            // Check if the new position is out of bounds
            if (
                newX >= this.size ||
                newY >= this.size ||
                newX < 0 ||
                newY < 0
            ) {
                return false;
            }

            // Check if the new position is already occupied
            if (this.board[newX][newY] && this.board[newX][newY] !== ship) {
                return false;
            }
        }
        // Return true if no issues were found
        return true;
    }

    // Check if the ship fits within the board and doesn't overlap with other ships
    placeShip(ship, x, y, orientation) {
        const shipInstance = new Ship(ship.type, ship.length);
        // Attempt to place the ship
        if (this.canPlaceShip(ship, x, y, orientation)) {
            // Place the ship on the gameboard
            for (let i = 0; i < ship.length; i += 1) {
                const newX = orientation === 'horizontal' ? x + i : x;
                const newY = orientation === 'vertical' ? y + i : y;
                this.board[newX][newY] = shipInstance;
            }
        }
    }

    // Check if an attack hits a ship
    receiveAttack(x, y) {
        // Check if there is already a ship in the attacked position
        const ship = this.board[x][y];
        // If ship was found and hit
        if (ship) {
            // Mark as a hit
            ship.hit();
            // Check if attacked ship is sunk
            if (ship.isSunk()) {
                // Display a message that the ship has sunk
                return ship.type;
            }
        }
        // Else, record the missed attack and return null
        this.missedAttacks.push({ x, y });
        return null;
    }

    // Check if all ships on the gameboard have been sunk
    allShipsSunk() {
        // Flag to indicate sunk status of all ships
        let allSunk = true;
        // Iterate through each cell on the board
        this.board.forEach((row) => {
            row.forEach((cell) => {
                // If a cell contains a ship that hasn't been sunk, set the flag to false
                if (cell && !cell.isSunk()) {
                    allSunk = false;
                }
            });
        });
        // Return the final state of the flag
        return allSunk;
    }
}

export default Gameboard;
