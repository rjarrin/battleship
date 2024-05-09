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
const gameboard = player1.gameboard;
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

                console.log(`CELL (${i},${j}): StartX: ${startX}, StartY: ${startY}, EndX: ${endX}, EndY: ${endY}`); // Debugging: Log the calculated positions


                // Highlight all cells within the ship's range
                for (let x = startX; x <= endX; x+=1) {
                    for (let y = startY; y <= endY; y+=1) {
                        const cell2 = document.getElementById(`cell-${x}-${y}`);
                        if (cell2) {
                            cell2.style.backgroundColor = "lightblue"; // Change this to the desired highlight color
                        }
                    }
                }
            });
            modalGrid.appendChild(cell);
        }
    }
    // // Identify the modal window
    // const modalGrid = document.getElementById("modal-grid");
    // for (let i = 0; i < (gameboard.size * gameboard.size); i += 1) {
    //     const cell = document.createElement("div");
    //     // Mouseover event listener: Simulate the ship placement
    //     cell.addEventListener("mouseover", () =>{
    //        // Change cell color to indicate a possible ship placement
    //         // Calculate the start and end positions of the ship based on the current cell and ship length/orientation
    //         console.log("Mouseover event triggered"); // Debugging: Check if the event is triggered

    //         const startX = parseInt(cell.dataset.x, 10);
    //         const startY = parseInt(cell.dataset.y, 10);
    //         const endX = startX + (currentShip.length - 1);
    //         const endY = startY;

    //         console.log(`StartX: ${startX}, StartY: ${startY}, EndX: ${endX}, EndY: ${endY}`); // Debugging: Log the calculated positions

    //         // Highlight all cells within the ship's range
    //         for (let x = startX; x <= endX; x+=1) {
    //             for (let y = startY; y <= endY; y+=1) {
    //                 const cell2 = document.getElementById(`cell-${x}-${y}`);
    //                 if (cell2) {
    //                     cell2.style.backgroundColor = "lightblue"; // Change this to the desired highlight color
    //                 }
    //             }
    //         } 
    //     });
    //     // Mouseout event listener: Return grid cells to unsimulated state
    //     cell.addEventListener("mouseout", () => {
    //         // Change the cell color to its original state
    //         cell.style.backgroundColor = "white";
    //     });
    //     // Click event listener: Place the ship
    //     cell.addEventListener("click", () => {
    //         // Place the ship on the grid
    //     });
    //     modalGrid.appendChild(cell);
    // }
}

generateModalGrid();