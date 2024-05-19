import Gameboard from './gameboard';

class Player {
    constructor(type) {
        // Sets type: Real or Computer
        this.type = type;
        // Assuming standard 10x10 board for games
        this.gameboard = new Gameboard(10);
    }
}

export default Player;
