export const ELEMENTS = {
  bush: "bush",
  player: "player",
};
export class Board {
  #map = null;
  #states = {
    NO_BUILD: 0,
    BUILD: 1,
  };
  #state = null;

  constructor() {
    this.#state = this.#states.NO_BUILD;
  }

  // desestructuracion del objeto payload que esta compuesto de size y elements
  build(payload) {
    const { size, elements } = payload;
    // Creo una matriz bidimensional this.#map inicializada con ceros
    this.#map = new Array(size).fill().map(() => new Array(size).fill(0));
    elements.forEach((element) => {
      if (element.type === "bush") {
        this.#map[element.x][element.y] = ELEMENTS.bush;
      } else if (element.type === "player") {
        this.#map[element.x][element.y] = ELEMENTS.player;
      }
    });
    this.#state = this.#states.BUILD;
  }

  get map() {
    if (this.#state === this.#states.BUILD) {
      return this.#map;
    }
    return undefined;
  }
}
