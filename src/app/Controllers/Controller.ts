//import { MatchesController } from './MatchesController';
import {
  IBoard, IController, IGameField, IMatches,
} from '../interfaces';
//import {LocalStorage} from "../LocalStorage";

export class Controller implements IController {

  private answerValues: number[];
  correctPairs: number;
  totalBoardPairs: number | undefined;
  onGameComplete: () => void
  private time: string;
  private mistakePairs: number;

  constructor() {
    this.answerValues = []
    this.correctPairs = 0
    this.time = ''
    this.mistakePairs = 0
    this.time = ''
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
      this.mistakePairs += 1
      return 'mistake'
    }
  }

  isComplete(): boolean {
    //
    return this.totalBoardPairs === this.correctPairs
  }

  gameTime(time: string) {
    this.time = time
  }

  finishData(difficult: number) {
 //   const local = new LocalStorage()
   return this.calculateScore(difficult, this.mistakePairs, this.time)
   // return local.setScoreData(score)
  }

  calculateScore(difficult: number, mistakes: number, time: string) {
    const koef = (difficult - 4) > 0 ? (difficult - 4) : 1
   const timeAr = time.split(':')
     const newAr = +[timeAr[0], [].concat(timeAr[1], timeAr[2]).join('')].join('.')
   console.log((100 - newAr) / mistakes * koef)
    return Math.round((100 - newAr) / mistakes * koef)
  }
}
