class Gameboard {
    constructor(size) {
        this.size = size;
        this.board = Gameboard.createBoard(size);
        this.missAttacks = [];
    }

    // Initialize a 2D array with the given size
    static createBoard(size) {
        const board = new Array(size)
            .fill(null)
            .map(() => new Array(size).fill(null));
        return board;
    }

    // Helper to check if chip can be placed in a given position
    canPlaceShip(ship, x, y, orientation) {
        for (let i = 0; i < ship.length; i += 1) {
            const newX = orientation === 'horizontal' ? x + i : x;
            const newY = orientation === 'vertical' ? y + i : y;

            // Check if the new position is within the board
            if (
                newX >= this.size ||
                newY >= this.size ||
                newX < 0 ||
                newY < 0
            ) {
                return false;
            }

            // Check if the new position is empty of contains the same ship
            if (this.board[newY][newX] && this.board[newY][newX] !== ship) {
                return false;
            }
        }
        return true;
    }

    // Check if the ship fits within the board and doesn't overlap with other ships
    placeShip(ship, x, y, orientation) {
        // Attempt to place the ship
        if (this.canPlaceShip(ship, x, y, orientation)) {
            for (let i = 0; i < ship.length; i += 1) {
                const newX = orientation === 'horizontal' ? x + i : x;
                const newY = orientation === 'vertical' ? y + i : y;
                this.board[newY][newX] = ship;
            }
        }
    }

    // Check if an attack hits a ship
    receiveAttack(x, y) {
        const ship = this.board[y][x];
        if (ship) {
            ship.hit();
            if (ship.isSunk()) {
                // Display a message that the ship has sunk
            } else {
                // Record the missed attack
                this.missAttacks.push({ x, y });
            }
        }
    }

    // Check if all ships on the gameboard have been sunk
    allShipsSunk() {
        let allSunk = true;
        // Iterate through each cell on the board
        this.board.forEach((row) => {
            row.forEach((cell) => {
                // Check cell status (needs to be a cell in use and should not be sunk to return false)
                if (cell && !cell.isSunk()) {
                    allSunk = false;
                }
            });
        });
        return allSunk;
    }
}

export default Gameboard;
