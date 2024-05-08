/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import Player from './player';

class ComputerPlayer extends Player {
    constructor() {
        super('computer');
    }
}

export default ComputerPlayer;
