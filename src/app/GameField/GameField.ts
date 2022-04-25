import './GameField.scss';
import { Board } from './Board/Board';
import { Timer } from './Timer/Timer';
import { IBoard, IGameField, ITimer } from '../interfaces';
import { observer } from '../Observer';
import Control from "../controll";

export class GameField extends Control implements IGameField {
  difficulty: { [key: string]: number };
  currentDifficulty: number;
  currentStyle: string;
  onGameComplete: () => void
  constructor(parentNode: HTMLElement, settings: Record<string, string>) {
    super(parentNode)
    this.difficulty = {
      easy: 4,
      middle: 6,
      hard: 8,
    };
    this.currentDifficulty = this.difficulty[settings.difficulty];
    this.currentStyle = settings.cardStyle;
    const gameWrapper = new Control(this.node, 'section', 'game__wrapper')
    const board = new Board(gameWrapper.node, this.currentStyle, this.currentDifficulty, settings.difficulty)
    board.onGameComplete = () => {
      this.onGameComplete()
    }
    const timer = new Timer(gameWrapper.node)
    board.onStartTimer = () => {
      timer.startTimer()
    }
  }
  setDifficult(difficult: string): void {
    this.currentDifficulty = this.difficulty[difficult];
  }

  setStyle(style: string): void {
    this.currentStyle = style;
  }

}
