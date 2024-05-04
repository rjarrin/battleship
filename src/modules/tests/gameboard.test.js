/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-undef */
import Gameboard from '../gameboard';
import Ship from '../ship';

describe('Gameboard', () => {
    let gameboard;

    beforeEach(() => {
        // Create a new gameboard before each test
        gameboard = new Gameboard(20);
    });

    // Testing placeShip()
    test('Should correctly place a ship', () => {
        const ship = new Ship(3, 0);
        gameboard.placeShip(ship, 0, 0, 'horizontal');
        // Check if the ship's cells on the gameboard are correctly set to the ship instance
        for (let i = 0; i < ship.length; i += 1) {
            expect(gameboard.board[0][i]).toBe(ship);
        }
    });

    // Testing receiveAttacks()
    test('Should correctly receive an attack', () => {
        const ship = new Ship(3, 0);
        gameboard.placeShip(ship, 0, 0, 'horizontal');
        gameboard.receiveAttack(0, 0);
        // Check if the ship's hit count was incremented
        expect(ship.hits).toBe(1);
    });
});
