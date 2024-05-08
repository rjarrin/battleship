/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-undef */
import RealPlayer from '../realPlayer';

describe('RealPlayer', () => {
    let realPlayer;

    beforeEach(() => {
        realPlayer = new RealPlayer();
    });

    test('Should correctly initialize a real player', () => {
        expect(realPlayer.type).toBe('real');
    });
});
