//import { MatchesController } from './MatchesController';
import {
  IBoard, IController, IGameField, IMatches,
} from '../interfaces';

export class Controller implements IController {

  private answerValues: number[];
  correctPairs: number;
  totalBoardPairs: number | undefined;
  onGameComplete: () => void
  constructor() {
    this.answerValues = []
    this.correctPairs = 0
  }
  pairsOnBoard(pairs: number): void {
    this.totalBoardPairs = pairs
  }
  answer(index: number): string {
    this.answerValues.push(index)
    if (!(this.answerValues.length == 2)) return 'wait'

    if (this.answerValues[0] === this.answerValues[1]) {
      this.answerValues = []
      this.correctPairs += 1
      const isComplete = this.isComplete()
      if (isComplete) {
        this.onGameComplete()
      }
      return 'correct'
    } else {
      this.answerValues = []
      return 'mistake'
    }
  }

  isComplete(): boolean {
    return this.totalBoardPairs === this.correctPairs
  }
}
