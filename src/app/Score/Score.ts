import './Score.scss';
import {GameResult, storage} from '../Storage/Storage';
import {IHelper, IScore} from '../interfaces';
import Control from "../controll";
import {ScoreItem} from "./ScoreItem";

export class Score extends Control implements IScore {
  parent: HTMLElement | undefined;
  private results: GameResult[]

  constructor(parentNode: HTMLElement,results:GameResult[]) {
    super(parentNode,'div', 'score__wrapper')
    this.results=results
    this.parent = undefined;
    const h3 = new Control(this.node, 'h3', 'score__h3', 'Score')

    this.render()
  }

  async drawScoreContent(parent: HTMLElement) {
   // const storageData = await storage.getResults();
   // const sortedData = storageData.sort((a, b) => a.score - b.score);
    const div = new Control(parent, 'section', 'score__content');
   const sortedData = this.results.sort((a,b)=>b.score-a.score)
   sortedData.forEach((man) => {
      const item = new ScoreItem(div.node,man)
    });
  }

  async render(): Promise<void> {
    await this.drawScoreContent(this.node);
  }
}
