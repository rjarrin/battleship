import '../style.css';
import RealPlayer from './realPlayer';
import ComputerPlayer from './computerPlayer';

// Define game status
let gameOver = false;

// Initialize the players
const player1 = new RealPlayer();
const computer = new ComputerPlayer();

// Define the initial turn
let isPlayerTurn = true;

// Game setup
// Extract gameboard from player1 instance
const { gameboard } = player1;
// Define player ships with types and lengths
const ships = [
    { type: 'Carrier', length: 5 },
    { type: 'Battleship', length: 4 },
    { type: 'Submarine', length: 3 },
    { type: 'Destroyer', length: 3 },
    { type: 'Boat', length: 2 },
];
// Index to track current ship being placed
let currentShipIndex = 0;
// Current ship to be placed (set to Carrier)
let currentShip = ships[currentShipIndex];
// Orientation of current ship placement
let currentOrientation = 'horizontal';

// Setup for computer ships
const computerShips = [
    { type: 'Carrier', length: 5 },
    { type: 'Battleship', length: 4 },
    { type: 'Submarine', length: 3 },
    { type: 'Destroyer', length: 3 },
    { type: 'Boat', length: 2 },
];

// Display game notifications to player
function showNotification(
    message,
    backgroundColor = '#f44336',
    position = 'right',
) {
    const notificationArea = document.getElementById('notification-area');
    const notificationMessage = document.getElementById('notification-message');
    notificationMessage.textContent = message;
    notificationArea.classList.add('show');

    notificationArea.style.backgroundColor = backgroundColor;
    // Reset position to avoid conflicts between left and right settings
    notificationArea.style.left = '';
    notificationArea.style.right = '';
    if (position === 'left') {
        notificationArea.style.left = '20px'; // Position on the left
    } else {
        notificationArea.style.right = '20px'; // Default to right
    }

    // Remove notification window after ~3 seconds
    setTimeout(() => {
        notificationArea.classList.remove('show');
    }, 3000);
}

// Display game end message to player
function showEndGameMessage(message, backgroundColor) {
    // Create the notification element
    const notification = document.createElement('div');
    notification.id = 'end-game-notification';

    // Style the message accordingly
    notification.style.backgroundColor = backgroundColor;
    notification.textContent = message;

    // Append the notification to the body
    document.body.appendChild(notification);

    // Remove the notification window after ~3 seconds
    setTimeout(() => {
        document.body.removeChild(notification);
    }, 3000);
}

// Update the UI with the current ship information (name)
function updateCurrentShipInfo() {
    const shipInfo = document.getElementById('current-ship-info');
    if (shipInfo) {
        shipInfo.textContent = `Currently placing ${currentShip.type}`;
    }
}

// Toggle current ship orientation (rotate button)
function toggleOrientation() {
    currentOrientation =
        currentOrientation === 'horizontal' ? 'vertical' : 'horizontal';
}

// Generates modal grid for player1 ship placement
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

                // Update the player's gameboard with the Ship object
                if (
                    player1.gameboard.canPlaceShip(
                        currentShip,
                        startX,
                        startY,
                        currentOrientation,
                    )
                ) {
                    // Place the ship on the gameboard
                    player1.gameboard.placeShip(
                        currentShip,
                        startX,
                        startY,
                        currentOrientation,
                    );

                    // Update the UI to reflect the ship placement
                    for (let x = startX; x <= endX; x += 1) {
                        for (let y = startY; y <= endY; y += 1) {
                            const cell2 = document.getElementById(
                                `cell-${x}-${y}`,
                            );
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
                        updateCurrentShipInfo();
                        const modal =
                            document.getElementById('place-ships-modal');
                        if (modal) {
                            modal.style.display = 'none';
                        }
                        // Duplicate the grid to the player-container
                        const playerContainer =
                            document.getElementById('player-container');
                        const newGrid = modalGrid.cloneNode(true);
                        playerContainer.appendChild(newGrid);
                    }
                } else {
                    showNotification('Cannot place a ship here');
                }
            });
            modalGrid.appendChild(cell);
        }
    }
}

// Places the computer's ships randomly on the gameboard
function computerPlacement() {
    computerShips.forEach((ship) => {
        let placed = false;
        while (!placed) {
            // Randomly select a starting position
            const startX = Math.floor(Math.random() * computer.gameboard.size);
            const startY = Math.floor(Math.random() * computer.gameboard.size);
            const orientation = Math.random() < 0.5 ? 'horizontal' : 'vertical';
            if (
                computer.gameboard.canPlaceShip(
                    ship,
                    startX,
                    startY,
                    orientation,
                )
            ) {
                // Place the ship
                computer.gameboard.placeShip(ship, startX, startY, orientation);
                placed = true;
            }
        }
    });
}

// Handles the computer's attacks against the player's ships
function computerAttack() {
    // Do nothing if the game is already over
    if (gameOver) return;

    // Flag to check if attack was completed
    let attacked = true;

    do {
        // Randomly select a cell to attack
        const row = Math.floor(Math.random() * player1.gameboard.size);
        const col = Math.floor(Math.random() * player1.gameboard.size);

        // Check if the cell was already attacked
        const cell = document.getElementById(`cell-${row}-${col}`);
        if (!cell.classList.contains('attacked')) {
            if (player1.gameboard.board[row][col]) {
                cell.style.backgroundColor = 'red';
                cell.classList.add('attacked');
                const sunkShipName = player1.gameboard.receiveAttack(row, col);
                if (sunkShipName) {
                    showNotification(
                        `Computer sunk your ${sunkShipName}!`,
                        'darkred',
                        'left',
                    );
                }
            } else {
                cell.style.backgroundColor = 'lightblue';
                cell.classList.add('attacked');
            }
            // If attack was on an already attacked cell, order was not completed and iteration should restart
            attacked = false;
        }
    } while (attacked);

    // Display end game message on computer win
    if (player1.gameboard.allShipsSunk()) {
        showEndGameMessage('You Lose!', 'darkred');
        gameOver = true;
    }
    // Update the turn
    isPlayerTurn = true;
}

// Simulates an attack by the player on the computer's ships
function simulateAttack(row, col) {
    // Prevent player from attacking if it is not their turn
    if (!isPlayerTurn) return;

    const cell = document.getElementById(`computer-cell-${row}-${col}`);
    // If cell was already attacked, advise the user and prompt them to try another cell.
    if (cell.classList.contains('attacked')) {
        showNotification(
            'This cell has already been attacked. Please choose another cell',
            'right',
        );
        return;
    }
    // If the cell was a ship (i.e., not null)
    if (computer.gameboard.board[row][col]) {
        cell.style.backgroundColor = 'red';
        // Define the cell as attacked and set the enemy ship to receive attack
        cell.classList.add('attacked');
        const sunkShipName = computer.gameboard.receiveAttack(row, col);
        // Advise player of ship sinking if ship is sunk
        if (sunkShipName) {
            showNotification(
                `You sunk the computer's ${sunkShipName}`,
                'navy',
                'right',
            );
        }
    } else {
        cell.style.backgroundColor = 'lightblue';
        cell.classList.add('attacked');
    }
    // Display end game message on player win
    if (computer.gameboard.allShipsSunk()) {
        showEndGameMessage('You Win!', 'cyan');
        gameOver = true;
    }

    // Switch turns
    isPlayerTurn = false;
    // Allow computer to make its move
    computerAttack();
}

// Generates the computer's game grid for displaying the game state
function generateComputerGrid() {
    const computerContainer = document.getElementById('computer-container');

    for (let i = 0; i < computer.gameboard.size; i += 1) {
        for (let j = 0; j < computer.gameboard.size; j += 1) {
            const cell = document.createElement('div');
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.id = `computer-cell-${i}-${j}`;
            cell.classList.add('cell');

            // Attach event listener for user clicks
            cell.addEventListener('click', () => {
                if (gameOver) return;
                simulateAttack(i, j);
            });

            // DEBUG: Update the cell's style based on the gameboard state
            // if (computer.gameboard.board[i][j]) {
            //     // If the cell contains a ship, update the style accordingly
            //     // cell.style.backgroundColor = 'blue';
            // } else {
            //     // If the cell is empty, update the style accordingly
            //     // cell.style.backgroundColor = 'white';
            // }

            computerContainer.appendChild(cell);
        }
    }
}

document
    .getElementById('modal-rotate')
    .addEventListener('click', toggleOrientation);
updateCurrentShipInfo();
computerPlacement();
generateComputerGrid();
generateModalGrid();
