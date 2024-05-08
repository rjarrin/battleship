/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import Player from './player';

class RealPlayer extends Player {
    constructor() {
        super('real');
    }
}

export default RealPlayer;
