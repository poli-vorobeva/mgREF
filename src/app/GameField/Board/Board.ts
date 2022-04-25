import './Board.scss';
import {CardItem} from './CardItem/CardItem';
import {Controller} from '../../Controllers/Controller';
import {IBoard, ICardItem, IController, IGameField} from '../../interfaces';
import {Modal} from './Modal/Modal';
import Control from '../../controll';

function arrayOfNmbers(maxNumber: number, arrayLength: number): number[] {
  const array = [];
  for (let i = 0; i < arrayLength; i++) {
    const random: number = Math.floor(Math.random() * 6);
    array.push(random);
    array.push(random);
  }
  return array;
}

function shuffleArray(array: number[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j: number = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [
      array[j],
      array[i],
    ];
  }
}

export class Board extends Control implements IBoard {
  difficultKoef: number;
  cards: HTMLElement | undefined;
  imagesArr: number[];
  cardsElement: null | HTMLElement;
  controller: Controller;
  cardsToCheck: ICardItem[];
  pairsOnBoard: number;
  onGameComplete:()=>void;
  onStartTimer:()=>void;
  diffStr: string;
  constructor(parentNode: HTMLElement, cardsStyle: string, difficulty: number,difficultyString:string) {
    super(parentNode)
    this.cards = undefined;
    this.diffStr=difficultyString
    this.difficultKoef = 1;
    this.imagesArr = [];
    this.controller = new Controller();
    this.controller.onGameComplete=()=>{
      this.onGameComplete()
    }
    this.cardsToCheck=[]
    this.cardsElement = null;
    this.getImagesArray(+difficulty);
    const cards = this.createCardsBoard(parentNode,
      this.imagesArr, cardsStyle, difficulty);
  }

  drawModal(): void {
    new Modal(this.node);
  }

  cardItem(parentNode: HTMLElement, style: string,
           arInx: number, array: number[]):Promise<CardItem> {
    const cardWrapper = new Control(parentNode, 'div',
      'card__wrapper')
    const cardI = new CardItem(cardWrapper.node, style, array[arInx],arInx)
    cardI.onStartTimer=()=>{
      this.onStartTimer()
    }
    cardI.onAnswer=(cardIndex,card:HTMLElement)=>{
      this.cardsToCheck.push(cardI)
      const answer=this.controller.answer(cardIndex)
      if(answer==='correct'|| answer==='mistake'){
        this.cardsToCheck.forEach(card=>{
          card.answer(answer)
        })
        this.cardsToCheck=[]
      }
    }
    return new Promise((res,rej)=>{
      cardI.animateFunction().then((data)=>{
        return res(data)
      })
    })
  }

  createCardsBoard(parentNode:HTMLElement,
                   numbersArray: number[], style: string,
                   difficult: number) {
    const cards = new Control(this.node, 'div', `cards__board ${this.diffStr}`);
    Promise.all(numbersArray.map((el,i)=>this.cardItem(cards.node, style, i, numbersArray))).then((data)=>{
      data.forEach(el=>el.flipp())
      setTimeout(()=>{
        data.forEach(el=>{
          el.unflip()
          this.onStartTimer()
        })
      },3500)
    })

  }

  getImagesArray(number: number): void {
    this.pairsOnBoard = number ** 2 / 2;
    this.controller.pairsOnBoard(this.pairsOnBoard)
    this.imagesArr = arrayOfNmbers(6, this.pairsOnBoard);
    shuffleArray(this.imagesArr);
  }
}
