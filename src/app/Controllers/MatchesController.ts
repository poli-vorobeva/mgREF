/*import { IBoard, IGameField, IMatches } from '../interfaces';
// import { Timer } from '../GameField/Timer/Timer';
import { storage } from '../Storage/Storage';
// import { app } from '../../index';

export class MatchesController implements IMatches {
  matchedPairs: number;

  mismatches: number;

  matches: number;

  time: number;

  board:IBoard;

  ancestor:IGameField;

  constructor(parent:IBoard, ancestor:IGameField) {
    this.board = parent;
    this.ancestor = ancestor;
    this.matchedPairs = 0;
    this.mismatches = 0;
    this.matches = 0;
    this.time = 0;
  }

  calculateScore(): number {
    const result: number = (this.board.pairsOnBoard - this.mismatches) * 100 - this.time * 10;
    return result > 0 ? result : 0;
  }

  async isResolved(): Promise<void> {
    if (this.board.pairsOnBoard === this.matchedPairs) {
      const timeToString = this.ancestor.timer.getTimeString();
      const score: number = this.calculateScore();
      if (
        localStorage.firstName
         && localStorage.lastName
         && localStorage.email
      ) {
        await storage.saveResult({
          user: {
            photo: localStorage.photo ? localStorage.photo : '',
            firstName: localStorage.firstName,
            lastName: localStorage.lastName,
            email: localStorage.email,
          },
          score,
        });
      }
      this.board.drawModal();
      this.ancestor.timer.stopTimer();
    }
  }

  mismatch(
    first: HTMLElement | undefined,
    second: HTMLElement | undefined,
  ): void {
    this.board.matchStyle(first?.children[1].children[1] as HTMLElement,
      second?.children[1].children[1] as HTMLElement, false);
    this.mismatches += 1;
  }

  async match(first: HTMLElement | undefined, second: HTMLElement | undefined): Promise<void> {
    this.board.matchStyle(first?.children[1].children[1] as HTMLElement,
      second?.children[1].children[1] as HTMLElement, true);
    this.matches += 1;
    this.matchedPairs += 1;
    await this.isResolved();
  }
}
*/