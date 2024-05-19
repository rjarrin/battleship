import Gameboard from './gameboard';

class Player {
    constructor(type) {
        this.type = type;
        this.gameboard = new Gameboard(10);
    }
}

export default Player;
