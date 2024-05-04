/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-undef */
import Ship from '../ship';

describe('Ship', () => {
    let ship;

    beforeEach(() => {
        // Create a new ship before each test
        ship = new Ship(3, 0);
    });

    // Constructor test
    test('Should correctly initialize a ship', () => {
        expect(ship.length).toBe(3);
        expect(ship.hits).toBe(0);
        expect(ship.sunked).toBe(false);
    });

    // Testing hit()
    test('Should increment hits when hit() is called', () => {
        ship.hit();
        expect(ship.hits).toBe(1);
    });

    // Testing isSunk()
    test('Should correctly determine if a ship is sunk', () => {
        expect(ship.isSunk()).toBe(false);
        ship.hit();
        ship.hit();
        ship.hit();
        expect(ship.isSunk()).toBe(true);
    });
});
