import './GameField.scss'
import {Board} from "./Board/Board";
import {Timer} from "./Timer/Timer";

export class GameField {
  drawGameBoard() {

  }

  init(): HTMLElement {
    const main = document.createElement('main')
    main.classList.add('main')

    main.appendChild(new Board(3, 3).init())
    main.appendChild(new Timer().init())

    return main
  }
}
