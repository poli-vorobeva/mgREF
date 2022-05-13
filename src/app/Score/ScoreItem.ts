import Control from "../controll";
import {GameResult} from "../Storage/Storage";

export class ScoreItem {
  constructor(parent: HTMLElement, data: GameResult) {
    const divM = new Control(parent, 'div', 'score__item')
    const e = JSON.parse(JSON.stringify(data));
    const avatar = new Control(divM.node, 'div', 'score__avatar')
    const img = new Control(avatar.node, 'img')
    img.node.setAttribute('src', e.user.photo ? e.user.photo : `./assets/avatar.png`);
    const divW = new Control(divM.node, 'div', 'score__subWrapper')
    const name = new Control(divW.node, 'h4', 'score__name', e.user.firstName)
    const score = new Control(divM.node, 'div', 'score__score', `${e.score}`)
  }
}
