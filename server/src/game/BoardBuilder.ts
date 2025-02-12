import { Board } from "./entities/Board.js";

export class BoardBuilder {
  private board: Board;

  constructor(payload: { size: number; numBushes: number }) {
    this.board = {
      size: payload.size,
      elements: [],
    };

    // this.board = {
    //     size: 8,
    //     elements: []
    // }
    // const map : Array<number[]> = [
    //     [0,0,0,0,0,0,0,0],
    //     [0,0,0,0,0,0,5,0],
    //     [0,5,0,0,0,0,0,0],
    //     [0,0,0,0,0,0,0,0],
    //     [0,0,0,0,0,5,0,0],
    //     [0,0,0,0,0,0,0,0],
    //     [0,0,0,0,0,0,5,0],
    //     [0,0,5,0,0,0,0,0]
    // ]
    // for(let i = 0; i < this.board.size; i++)
    //     for(let j = 0; j < this.board.size; j++)
    //         if(map[i][j] != 0) {
    //             this.board.elements.push({x : i, y : j})
    //         }

    this.board.elements.push({ x: 0, y: 0, type: "player" });
    this.board.elements.push({ x: 0, y: this.board.size - 1, type: "player" });
    this.board.elements.push({ x: this.board.size - 1, y: 0, type: "player" });
    this.board.elements.push({
      x: this.board.size - 1,
      y: this.board.size - 1,
      type: "player",
    });

    // Añadir arbustos en posiciones aleatorias
    const numBushes = payload.numBushes;
    let bushesAdded = 0;
    while (bushesAdded < numBushes) {
      const x = Math.floor(Math.random() * this.board.size);
      const y = Math.floor(Math.random() * this.board.size);
      // Evitar colocar arbustos en las posiciones de los jugadores y otros arbustos
      // si la posicion esta libre 'some' devuelve false y agrega de nuevo el objeto arbusto
      if (!this.board.elements.some((e) => e.x === x && e.y === y)) {
        this.board.elements.push({ x, y, type: "bush" });
        bushesAdded++;
      }
    }
  }

  public getBoard(): Board {
    return this.board;
  }
}
