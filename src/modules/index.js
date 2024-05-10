/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import '../style.css';
import RealPlayer from './realPlayer';
import ComputerPlayer from "./computerPlayer";
import Gameboard from './gameboard';
import Ship from './ship';

// Initialize the players
const player1 = new RealPlayer();
const player2 = new ComputerPlayer();

// Initalize the gameboard and ships
const {gameboard} = player1;
const ships = [
    {type: 'Carrier', length: 5},
    {type: 'Battleship', length: 4},
    {type: 'Submarine', length: 3},
    {type: 'Destroyer', length: 3},
    {type: 'Boat', length: 2}
];
let currentShipIndex = 0;
let currentShip = ships[currentShipIndex];
let currentOrientation = "horizontal";

// Toggle ship orientation (rotate button)
function toggleOrientation() {
    currentOrientation = currentOrientation === "horizontal" ? "vertical" : "horizontal";
}

function generateModalGrid() {
    const modalGrid = document.getElementById("modal-grid");
    for (let i = 0; i < gameboard.size; i += 1) {
        for (let j = 0; j < gameboard.size; j += 1) {
            const cell = document.createElement("div");
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.id = `cell-${i}-${j}`;
            
            // Mouseover event
            cell.addEventListener("mouseover", () => {
                const row = parseInt(cell.dataset.row, 10);
                const col = parseInt(cell.dataset.col, 10);
                const startX = row;
                const startY = col;
                const endX = startX + currentShip.length - 1;
                const endY = startY;

                // Highlight all cells within the ship's range
                for (let x = startX; x <= endX; x+=1) {
                    for (let y = startY; y <= endY; y+=1) {
                        const cell2 = document.getElementById(`cell-${x}-${y}`);
                        if (cell2 &&!cell2.classList.contains('placed')) {
                            cell2.style.backgroundColor = "lightblue";
                        }
                    }
                }
            });

             // Mouseout event
             cell.addEventListener("mouseout", () => {
                // Reset the background color of all cells within the ship's range
                const startX = parseInt(cell.dataset.row, 10);
                const startY = parseInt(cell.dataset.col, 10);
                const endX = startX + currentShip.length - 1;
                const endY = startY;

                for (let x = startX; x <= endX; x += 1) {
                    for (let y = startY; y <= endY; y += 1) {
                        const cell2 = document.getElementById(`cell-${x}-${y}`);
                        if (cell2 &&!cell2.classList.contains('placed')) {
                            cell2.style.backgroundColor = "white";
                        }
                    }
                }
            });

            // Click event
            cell.addEventListener("click", () => {
                // Change the background color of the highlighted cells to grey
                const startX = parseInt(cell.dataset.row, 10);
                const startY = parseInt(cell.dataset.col, 10);
                const endX = startX + currentShip.length - 1;
                const endY = startY;

                for (let x = startX; x <= endX; x += 1) {
                    for (let y = startY; y <= endY; y += 1) {
                        const cell2 = document.getElementById(`cell-${x}-${y}`);
                        if (cell2) {
                            cell2.style.backgroundColor = "grey";
                            cell2.classList.add('placed');
                        }
                    }
                }
            });
            
            modalGrid.appendChild(cell);
        }
    }
 
}

generateModalGrid();