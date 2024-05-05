/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-undef */
import Gameboard from '../gameboard';
import Ship from '../ship';

describe('Gameboard', () => {
    let gameboard;

    beforeEach(() => {
        // Create a new gameboard before each test
        gameboard = new Gameboard(10);
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

    // Testing allShipsSunk()
    test('Should correctly determine if all ships are sunk', () => {
        const ship1 = new Ship(3, 0);
        const ship2 = new Ship(2, 0);
        gameboard.placeShip(ship1, 0, 0, 'horizontal');
        gameboard.placeShip(ship2, 0, 5, 'horizontal');
        // Simulate the attacks to sink both ships
        for (let i = 0; i < 3; i += 1) {
            gameboard.receiveAttack(i, 0);
        }
        for (let i = 0; i < 2; i += 1) {
            gameboard.receiveAttack(i, 5);
        }
        // Check if all ships are sunk
        expect(gameboard.allShipsSunk()).toBe(true);
    });

    test('Should correctly track missed attacks', () => {
        gameboard.receiveAttack(0, 0);
        expect(gameboard.missedAttacks).toContainEqual({ x: 0, y: 0 });
    });
});
