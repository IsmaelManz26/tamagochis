import { UIv1 } from "./UIv1.js";

export const ButtonController = {
  init: () => {
    const moveBtn = document.getElementById("move-btn");
    const shootBtn = document.getElementById("shoot-btn");
    const rotateBtn = document.getElementById("rotate-btn");

    if (moveBtn) {
      moveBtn.addEventListener("click", ButtonController.handleMove);
    }
    if (shootBtn) {
      shootBtn.addEventListener("click", ButtonController.handleShoot);
    }
    if (rotateBtn) {
      rotateBtn.addEventListener("click", ButtonController.handleRotate);
    }
  },

  handleMove: () => {
    console.log("Botón de Mover presionado");
    // Inicializo la posición del jugador si aún no existe
    if (!UIv1.player) {
      UIv1.player = { x: 0, y: 0 };
    }
    const currentPos = UIv1.player;

    // Obtengo el estado actual del tablero desde UIv1
    const board = UIv1.boardState;
    if (!board) {
      console.error("El estado del tablero no está definido");
      return;
    }
    const boardSize = board.length;
    // Suponiendo que el movimiento es hacia la derecha:
    const newX = currentPos.x;
    const newY = currentPos.y + 1;

    // Comprobar límites del tablero
    if (newY >= boardSize) {
      console.log("Movimiento fuera de límite");
      return;
    }
    // Comprobar si la celda de destino está ocupada por otro jugador
    if (board[newX][newY] === "player") {
      console.log("El espacio está ocupado por otro jugador");
      return;
    }
    // Actualizar el estado del tablero:
    // Limpio la celda previa
    board[currentPos.x][currentPos.y] = 0;
    // Asigno la nueva posición
    board[newX][newY] = "player";

    // Actualizo la posición del jugador en UIv1:
    UIv1.player = { x: newX, y: newY };

    // Pinto el tablero de nuevo con el estado nuevo
    UIv1.drawBoard(board);

    console.log(`Jugador movido a la posición: (${newX}, ${newY})`);
  },

  handleShoot: () => {
    console.log("Botón de Disparar presionado");
  },

  handleRotate: () => {
    console.log("Botón de Rotar presionado");
  },
};
