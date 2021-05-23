import './CardItem.scss'
import {__} from "../../../HelperUtil/HelperUtil";


export class CardItem {
  images: string[]

  constructor() {
    this.images = ['img1', 'img2', 'img3', 'img4', 'img5', 'img6']
  }

  init() {
    const bgImg = __.create('img', 'card__back-bg').attribute('src', './assets/back.png')
    const front = __.create('div', 'card__front').append(bgImg).end()
    const random = this.getRandom()
    const frImg = __.create('img', 'card__front-bg').attribute('src', `./assets/${this.images[random]}.png`)
    const backGradient = __.create('div', 'card__back-gradient').end()
    const back = __.create('div', 'card__back').append(front).append(frImg).append(backGradient).end()
    const card = __.create('div', 'card__content').append(front as HTMLElement).append(back as HTMLElement).end()
    return <HTMLElement>card
  }

  getRandom() {
    const random = Math.floor(Math.random() * this.images.length)
    return <number>random
  }
}
