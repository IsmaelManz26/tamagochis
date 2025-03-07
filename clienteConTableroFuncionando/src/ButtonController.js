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
  },

  handleShoot: () => {
    console.log("Botón de Disparar presionado");
  },

  handleRotate: () => {
    console.log("Botón de Rotar presionado");
  },
};
