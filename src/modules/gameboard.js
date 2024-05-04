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
}

export default Gameboard;
