import { UI_BUILDER } from "./Ui.js";
import { ELEMENTS } from "./entities/Board.js";
import { ButtonController } from "./ButtonController.js";

export const UIv1 = UI_BUILDER.init();

UIv1.initUI = () => {
  const base = document.getElementById(UIv1.uiElements.board);
  base.classList.add("board");

  UIv1.initControls();
};

UIv1.initControls = () => {
  let controls = document.getElementById("controls");
  if (!controls) {
    controls = document.createElement("div");
    controls.id = "controls";
    document.body.appendChild(controls);
  }

  const moveBtn = document.createElement("button");
  moveBtn.id = "move-btn";
  moveBtn.textContent = "Mover";
  controls.appendChild(moveBtn);

  const shootBtn = document.createElement("button");
  shootBtn.id = "shoot-btn";
  shootBtn.textContent = "Disparar";
  controls.appendChild(shootBtn);

  const rotateBtn = document.createElement("button");
  rotateBtn.id = "rotate-btn";
  rotateBtn.textContent = "Rotar";
  controls.appendChild(rotateBtn);

  // llamo a la funcionalidad de los botones al final de initcontrols
  // para asegurarme de que los botones ya estan creados
  ButtonController.init();
};

UIv1.drawBoard = (board) => {
  if (board !== undefined) {
    const base = document.getElementById(UIv1.uiElements.board);
    base.innerHTML = "";
    base.style.gridTemplateColumns = `repeat(${board.length}, 100px)`;
    base.style.gridTemplateRows = `repeat(${board.length}, 100px)`;
    board.forEach((element) =>
      element.forEach((element) => {
        const tile = document.createElement("div");
        tile.classList.add("tile");

        // Agrego la clase bush al elemento bush y la clase player al elemento player
        if (element === ELEMENTS.bush) {
          tile.classList.add("bush");
        } else if (element === ELEMENTS.player) {
          tile.classList.add("player");
        }

        base.appendChild(tile);
        anime({
          targets: tile,
          opacity: [1],
          // opacity: [0, 1],
          // duration: Math.random() * 8000 + 1000,
          // easing: "easeInOutQuad",
        });
      })
    );
  }
};

UIv1.drawBoard();
