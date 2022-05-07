import './CardItem.scss';
import {ICardItem} from '../../../interfaces';
import Control from "../../../controll";

export class CardItem extends Control implements ICardItem {
  images: string[];
  cardsStyle: string;
  onAnswer: (cardNumber: number, card: HTMLElement) => void
  onCheckAnswer:()=>void
  card: Control<HTMLElement>;
  backGradient: Control<HTMLElement>;
  onStartTimer: () => void;
  delayIndex: number;
  number: number;

  constructor(parentNode: HTMLElement, style: string, number: number, i: number) {
    super(parentNode)
    this.images = ['img1', 'img2', 'img3', 'img4', 'img5', 'img6'];
    this.delayIndex = i
    this.number = number
    this.cardsStyle = style.toLowerCase();
    this.card = new Control(parentNode, 'div', 'animateCard' /*'card__content flipped'*/)
    const front = new Control(this.card.node, 'div', 'card__front')
    const bgImg = new Control(front.node, 'img', 'card__back-bg')
    bgImg.node.setAttribute('src', './assets/back.png');
    const back = new Control(this.card.node, 'div', 'card__back')
    const frontBack = new Control(back.node, 'div', 'card__front')
    const frImg = new Control(back.node, 'img', 'card__front-bg')
    frImg.node.setAttribute('src', `./assets/${this.cardsStyle}/${this.images[number]}.png`,
    );
    this.backGradient = new Control(back.node, 'div', 'card__back-gradient')
  }

  unflip() {
    this.card.node.style.transitionDelay = `unset`
    this.card.node.classList.remove('flipped');
    this.card.node.addEventListener('click', (e) => {
      this.card.node.classList.add('flipped');
      this.card.node.ontransitionend = () => {
        this.onCheckAnswer()
      }
      this.onAnswer(this.number, this.card.node)
    }, false);
  }

  flipp(): Promise<unknown> {
    return new Promise((res,rej)=>{
      this.card.node.classList.add('flipped')
      this.card.node.ontransitionend=()=>{
        return res(null)
      }
    })

  }

  answer(answerResult: string) {
    if (answerResult === 'correct') {
      this.backGradient.node.style.background = 'rgba(0,200,50,0.3)'
    } else if (answerResult === 'mistake') {
      this.backGradient.node.style.background = 'rgba(200,0,50,0.3)'
      setTimeout(() => {
        this.backGradient.node.style.background = 'unset'
        this.card.node.classList.remove('flipped')
      }, 500)

    }
  }

  animateFunction(): Promise<CardItem> {
    return new Promise((res, rej) => {
      setTimeout(() => {
        this.anitamateFadeIn(this.card.node, Math.abs(this.delayIndex - 15)).then(() => {
          return res(this)
        })
      }, 1000)
    })

  }

  anitamateFadeIn(el: HTMLElement, delayIndex: number) {
    const rand = Math.floor(Math.random() * delayIndex * 10)
    el.classList.remove('animateCard')
    el.classList.add('card__content')
    el.style.transitionDelay = `${rand * 10}ms`
    return new Promise((res, rej) => {
      el.ontransitionend = () => {
        return res(null)
      }
    })
  }
}
