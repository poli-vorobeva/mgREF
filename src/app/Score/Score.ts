import './Score.scss';
import {storage} from '../Storage/Storage';
import {IHelper, IScore} from '../interfaces';
import Control from "../controll";

export class Score extends Control implements IScore {
  parent: HTMLElement | undefined;

  constructor(parentNode: HTMLElement) {
    super(parentNode)
    this.parent = undefined;
    this.render()
  }

  async drawScoreContent(parent: HTMLElement) {
    const storageData = await storage.getResults();
    const sortedData = storageData.sort((a, b) => a.score - b.score);
    const div = new Control(parent, 'section', 'score__content');
    sortedData.forEach((man) => {
      const divM = new Control(div.node, 'div', 'score__item')
      const e = JSON.parse(JSON.stringify(man));
      const avatar = new Control(divM.node, 'div', 'score__avatar')
      const img = new Control(avatar.node, 'img')
      img.node.setAttribute('src', e.user.photo);
      const divW = new Control(divM.node, 'div', 'score__subWrapper')
      const name = new Control(divW.node, 'h4', 'score__name', e.user.firstName)
      const score = new Control(divM.node, 'div', 'score__score', `${e.score}`)
    });
  }

  async render(): Promise<void> {
    const wrapper = new Control(this.node, 'div', 'score__wrapper')
    const h3 = new Control(wrapper.node, 'h3', 'score__h3', 'Score')
    await this.drawScoreContent(wrapper.node);
  }
}
