import './Board.scss'
//import exports from "webpack";
//import compareNumbers = exports.util.comparators.compareNumbers;
import {CardItem} from "./CardItem/CardItem";
import {__} from "../../HelperUtil/HelperUtil";
import {control} from "../../Controllers/Controller";


export class Board {
  rows: number
  cols: number

  constructor(rws: number, cols: number) {
    this.rows = rws
    this.cols = cols
  }

  init() {
    const cards = __.create('div', 'cards__board')

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        const cardI: HTMLElement | null | string | undefined = __.in(new CardItem().init())
          .attribute('data-index', `${i}:${j}`)
        const cardWrapper = __.create('div', 'card__wrapper').append(cardI).end()

        if (typeof cardI === 'object') {
          cardI?.addEventListener('click', (e: Event) => {
            (e.currentTarget as Element).classList.add('flipped')
            const ind = '' + (e.currentTarget as Element).getAttribute('data-index')
            control.check(ind, (e.currentTarget as HTMLElement))
          })
        }
        cards.append(cardWrapper)
      }
    }
    const getPairsOnBoard = control.getAllOverlaps()
    return <HTMLElement>cards.end()
  }

}
