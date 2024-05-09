/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import '../style.css';
import RealPlayer from './realPlayer';
import ComputerPlayer from "./computerPlayer";

// Initialize the players
const player1 = new RealPlayer();
const player2 = new ComputerPlayer();

function generateModalGrid() {
    // Identify the modal window
    const modalGrid = document.getElementById("modal-grid");
    for (let i = 0; i < (player1.gameboard.size * player1.gameboard.size); i += 1) {
        const cell = document.createElement("div");
        modalGrid.appendChild(cell);
    }
}

generateModalGrid();