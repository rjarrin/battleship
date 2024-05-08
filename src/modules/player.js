/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import Gameboard from './gameboard';

class Player {
    constructor(type) {
        this.type = type;
        this.gameboard = new Gameboard(10);
    }
}

export default Player;
