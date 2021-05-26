import './GameField.scss'
import {Board} from "./Board/Board";
import {timer, Timer} from "./Timer/Timer";

export class GameField {
  init(): HTMLElement {
    const main = document.createElement('main')
    main.classList.add('main')

    main.appendChild(new Board(3, 3).init())
    main.appendChild(timer.init())
    setTimeout(()=>timer.startTimer(),0)
    return main
  }
}
