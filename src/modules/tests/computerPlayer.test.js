/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-undef */
import ComputerPlayer from '../computerPlayer';

describe('ComputerPlayer', () => {
    let computerPlayer;

    beforeEach(() => {
        computerPlayer = new ComputerPlayer();
    });

    test('Should correctly initialize a computer player', () => {
        expect(computerPlayer.type).toBe('computer');
    });
});
