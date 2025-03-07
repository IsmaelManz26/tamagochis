import { Board } from "../entities/Board.js";
import { Queue } from "../Queue.js";
export class GameService {
  #states = {
    WAITING: 0,
    PLAYING: 1,
    ENDED: 2,
  };
  #ui = null;
  #players = [];
  #board = null;
  #queue = null;
  #state = null;
  #parallel = null;

  // #numBushes = 6;

  #actionsList = {
    NEW_PLAYER: this.do_newPlayer.bind(this),
    BOARD: this.do_newBoard.bind(this),
  };

  constructor(ui) {
    this.#state = this.#states.WAITING;
    this.#board = new Board();
    this.#queue = new Queue();
    this.#parallel = null;
    this.checkScheduler();
    this.#ui = ui;
  }

  checkScheduler() {
    if (!this.#queue.isEmpty()) {
      if (this.#parallel == null) {
        this.#parallel = setInterval(async () => {
          const action = this.#queue.getMessage();
          if (action != undefined) {
            await this.#actionsList[action.type](action.content);
          } else {
            this.stopScheduler();
          }
        });
      }
    }
  }

  stopScheduler() {
    clearInterval(this.#parallel);
    this.#parallel = null;
  }

  do(data) {
    this.#queue.addMessage(data);
    this.checkScheduler();
  }

  async do_newPlayer(payload) {
    console.log("ha llegado un jugador nuevo");
  }

  async do_newBoard(payload) {
    console.log("ha llegado un tablero nuevo");
    // Construye el tablero
    this.#board.build(payload);

    // Extraemos la posición asignada para el jugador actual basándonos en su identificador
    if (this.#ui.playerId) {
      const playerElement = payload.elements.find(
        (el) => el.type === "player" && el.identificador === this.#ui.playerId
      );
      if (playerElement) {
        this.#ui.player = { x: playerElement.x, y: playerElement.y };
        console.log(
          `Posición inicial del jugador: (${playerElement.x}, ${playerElement.y})`
        );
      } else {
        console.warn("No se encontró la posición asignada al jugador");
      }
    } else {
      console.warn(
        "No se ha establecido el identificador del jugador en la UI"
      );
    }
    // Dibuja el tablero con el estado actualizado
    this.#ui.drawBoard(this.#board.map);
  }
}
