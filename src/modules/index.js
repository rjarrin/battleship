/* eslint-disable no-loop-func */ // --------> NEED TO ENABLE AND FIX THE BUGS
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import '../style.css';
import RealPlayer from './realPlayer';
import ComputerPlayer from './computerPlayer';
// import Gameboard from './gameboard';
import Ship from './ship';

// Initialize the players
const player1 = new RealPlayer();
const computer = new ComputerPlayer();

// Initalize the gameboard and ships
const { gameboard } = player1;
const ships = [
    { type: 'Carrier', length: 5 },
    { type: 'Battleship', length: 4 },
    { type: 'Submarine', length: 3 },
    { type: 'Destroyer', length: 3 },
    { type: 'Boat', length: 2 },
];
let currentShipIndex = 0;
let currentShip = ships[currentShipIndex];
let currentOrientation = 'horizontal';

// Computer ships
const computerShips = [
    { type: 'Carrier', length: 5 },
    { type: 'Battleship', length: 4 },
    { type: 'Submarine', length: 3 },
    { type: 'Destroyer', length: 3 },
    { type: 'Boat', length: 2 },
];


function updateCurrentShipInfo() {
    const shipInfo = document.getElementById('current-ship-info');
    if (shipInfo) {
        shipInfo.textContent = `Currently placing ${currentShip.type}`;
    }
}

// Toggle ship orientation (rotate button)
function toggleOrientation() {
    currentOrientation =
        currentOrientation === 'horizontal' ? 'vertical' : 'horizontal';
}

function generateModalGrid() {
    const modalGrid = document.getElementById('modal-grid');
    for (let i = 0; i < gameboard.size; i += 1) {
        for (let j = 0; j < gameboard.size; j += 1) {
            const cell = document.createElement('div');
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.id = `cell-${i}-${j}`;

            // Mouseover event
            cell.addEventListener('mouseover', () => {
                const row = parseInt(cell.dataset.row, 10);
                const col = parseInt(cell.dataset.col, 10);
                const startX = row;
                const startY = col;
                let endX;
                let endY;
                // Calculate endX and endY based on the current orientation
                if (currentOrientation === 'horizontal') {
                    endX = startX + currentShip.length - 1;
                    endY = startY;
                } else {
                    // vertical
                    endX = startX;
                    endY = startY + currentShip.length - 1;
                }

                // Highlight all cells within the ship's range
                for (let x = startX; x <= endX; x += 1) {
                    for (let y = startY; y <= endY; y += 1) {
                        const cell2 = document.getElementById(`cell-${x}-${y}`);
                        if (cell2) {
                            if (cell2.classList.contains('placed')) {
                                cell2.style.backgroundColor = 'red'; 
                            } else {
                                cell2.style.backgroundColor = 'lightblue';
                            }
                        }
                    }
                }
            });

            // Mouseover event
            cell.addEventListener('mouseover', () => {
                const row = parseInt(cell.dataset.row, 10);
                const col = parseInt(cell.dataset.col, 10);
                const startX = row;
                const startY = col;
                let endX;
                let endY;

                // Calculate endX and endY based on the current orientation
                if (currentOrientation === 'horizontal') {
                    endX = startX + currentShip.length - 1;
                    endY = startY;
                } else {
                    // vertical
                    endX = startX;
                    endY = startY + currentShip.length - 1;
                }

                // Highlight all cells within the ship's range
                for (let x = startX; x <= endX; x += 1) {
                    for (let y = startY; y <= endY; y += 1) {
                        const cell2 = document.getElementById(`cell-${x}-${y}`);
                        if (cell2) {
                            if (cell2.classList.contains('placed')) {
                                cell2.style.backgroundColor = 'red';
                            } else {
                                cell2.style.backgroundColor = 'lightblue';
                            }
                        }
                    }
                }
            });

            // Mouseout event
            cell.addEventListener('mouseout', () => {
                const startX = parseInt(cell.dataset.row, 10);
                const startY = parseInt(cell.dataset.col, 10);
                let endX;
                let endY;

                // Calculate endX and endY based on the current orientation
                if (currentOrientation === 'horizontal') {
                    endX = startX + currentShip.length - 1;
                    endY = startY;
                } else {
                    // vertical
                    endX = startX;
                    endY = startY + currentShip.length - 1;
                }

                for (let x = startX; x <= endX; x += 1) {
                    for (let y = startY; y <= endY; y += 1) {
                        const cell2 = document.getElementById(`cell-${x}-${y}`);
                        if (cell2) {
                            if (cell2.classList.contains('placed')) {
                                cell2.style.backgroundColor = 'grey';
                            } else {
                                cell2.style.backgroundColor = 'white';
                            }
                        }
                    }
                }
            });

            // Click event
            cell.addEventListener('click', () => {
                // Check if any of the cells within the ship's range are already placed
                const startX = parseInt(cell.dataset.row, 10);
                const startY = parseInt(cell.dataset.col, 10);
                let endX;
                let endY;

                // Calculate endX and endY based on the current orientation
                if (currentOrientation === 'horizontal') {
                    endX = startX + currentShip.length - 1;
                    endY = startY;
                } else {
                    // vertical
                    endX = startX;
                    endY = startY + currentShip.length - 1;
                }

                let isOverlapping = false;
                for (let x = startX; x <= endX; x += 1) {
                    for (let y = startY; y <= endY; y += 1) {
                        const cell2 = document.getElementById(`cell-${x}-${y}`);
                        if (cell2 && cell2.classList.contains('placed')) {
                            isOverlapping = true;
                            break;
                        }
                    }
                    if (isOverlapping) break;
                }

                if (isOverlapping) {
                    alert(
                        'You cannot place a ship over another ship. Please choose a different location.',
                    );
                    return;
                }

                // Update the player's gameboard with the Ship object
                for (let x = startX; x <= endX; x += 1) {
                    for (let y = startY; y <= endY; y += 1) {
                        player1.gameboard.board[y][x] = new Ship(
                            currentShip.length,
                            0,
                        );
                    }
                }

                // Change the background color of the highlighted cells to grey
                for (let x = startX; x <= endX; x += 1) {
                    for (let y = startY; y <= endY; y += 1) {
                        const cell2 = document.getElementById(`cell-${x}-${y}`);
                        if (cell2) {
                            cell2.style.backgroundColor = 'grey';
                            cell2.classList.add('placed');
                        }
                    }
                }

                // Move to the next ship in the list
                currentShipIndex += 1;
                if (currentShipIndex < ships.length) {
                    currentShip = ships[currentShipIndex];
                    updateCurrentShipInfo();
                } else {
                    updateCurrentShipInfo(); // Update ship info after all ships have been placed
                    const modal = document.getElementById('place-ships-modal');
                    if (modal) {
                        modal.style.display = 'none';
                    }

                    // Duplicate the grid to the player-container
                    const playerContainer =
                        document.getElementById('player-container');
                    const newGrid = modalGrid.cloneNode(true);
                    playerContainer.appendChild(newGrid);

                    // Print the player gameboard for confirmation of correct item placement
                    console.log(player1.gameboard.board);
                    console.log(player1.gameboard.receiveAttack(1,2));
                    console.log(player1.gameboard.receiveAttack(3,1));
                }
            });

            modalGrid.appendChild(cell);
        }
    }
}

function generateComputerGrid() {
    const computerContainer = document.getElementById("computer-container");

    for (let i = 0; i < computer.gameboard.size; i++) {
        for (let j = 0; j < computer.gameboard.size; j++) {
            const cell = document.createElement('div');
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.id = `computer-cell-${i}-${j}`;

            // Update the cell's style based on the gameboard state
            if (computer.gameboard.board[i][j]) {
                // If the cell contains a ship, update the style accordingly
                cell.style.backgroundColor = 'blue';
            } else {
                // If the cell is empty, update the style accordingly
                cell.style.backgroundColor = 'white';
            }

            computerContainer.appendChild(cell);
        }
    }
}

document
    .getElementById('modal-rotate')
    .addEventListener('click', toggleOrientation);
updateCurrentShipInfo();
generateComputerGrid();
generateModalGrid();
