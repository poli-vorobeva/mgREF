import './Board.scss';
import {CardItem} from './CardItem/CardItem';
import {Controller} from '../../Controllers/Controller';
import {IBoard, ICardItem, IController, IGameField} from '../../interfaces';
import {Modal} from './Modal/Modal';
import Control from '../../controll';

function shuffleArray(_array: number[]): number[] {
  const array=_array.slice()

  for (let i = array.length - 1; i > 0; i--) {
    const j: number = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [
      array[j],
      array[i],
    ];
  }
  return array
}

export class Board extends Control implements IBoard {
  difficultKoef: number;
  cards: HTMLElement | undefined;
  imagesArr: number[];
  cardsElement: null | HTMLElement;
  controller: Controller;
  cardsToCheck: ICardItem[];
  pairsOnBoard: number;
  onGameComplete: () => void;
  onStartTimer: () => void;
  diffStr: string;
  private answerStatus: string;
  private disableClickBlock: Control<HTMLElement>;
  private cardsHTMLWrapper: Control<HTMLElement>;

  constructor(parentNode: HTMLElement, cardsStyle: string, difficulty: number, difficultyString: string) {
    super(parentNode)
    this.cards = undefined;
    this.diffStr = difficultyString
    this.difficultKoef = 1;
    this.imagesArr = [];
    this.answerStatus=''
    this.controller = new Controller();
    this.controller.onGameComplete = () => {
      this.onGameComplete()
    }
    this.cardsToCheck = [];
    this.cardsElement = null;
    this.imagesArr=this.getImagesArray(+difficulty);
    const cards = this.createCardsBoard(parentNode,
      this.imagesArr, cardsStyle, difficulty);
  }

  drawModal(): void {
    new Modal(this.node);
  }

  cardItem(parentNode: HTMLElement, style: string,
           arInx: number, array: number[]): Promise<CardItem> {
    const cardWrapper = new Control(parentNode, 'div',
      'card__wrapper')
    const cardI = new CardItem(cardWrapper.node, style, array[arInx], arInx)
    cardI.onStartTimer = () => {
      this.onStartTimer()
    }
    cardI.onAnswer = (cardIndex, card: HTMLElement) => {
      this.cardsToCheck.push(cardI)
      const answer = this.controller.answer(cardIndex)
      this.answerStatus=answer
      if(this.answerStatus=='correct' || this.answerStatus=='mistake'){
        this.disableClickBlock=new Control(this.cardsHTMLWrapper.node,'div',
          'disableClick')
      }
    }
    cardI.onCheckAnswer=()=>{
     if (this.answerStatus === 'correct' || this.answerStatus === 'mistake') {
       this.disableClickBlock.destroy()
        this.cardsToCheck.forEach(card => {
          card.answer(this.answerStatus)
        })
        this.cardsToCheck = []
      }
    }
    return new Promise((res, rej) => {
      cardI.animateFunction().then((data) => {
        return res(data)
      })
    })
  }

  createCardsBoard(parentNode: HTMLElement,
                   numbersArray: number[], style: string,
                   difficult: number) {
    this.cardsHTMLWrapper = new Control(this.node, 'div', `cards__board ${this.diffStr}`);
    Promise.all(numbersArray.map((el, i) => this.cardItem(this.cardsHTMLWrapper.node, style, i, numbersArray))).then((data) => {
      data.forEach(el => el.flipp())
      setTimeout(() => {
        data.forEach(el => {
          el.unflip()
          this.onStartTimer()
        })
      }, 3500)
    })
  }

  getImagesArray(number: number): number[]{
    this.pairsOnBoard = number ** 2 / 2;
    this.controller.pairsOnBoard(this.pairsOnBoard)
    const newArrayOfNumbers = new Array(this.pairsOnBoard * 2)
    this.imagesArr=this.numbersAr(this.pairsOnBoard,5)
    const shufFirst=shuffleArray(this.imagesArr);
    const shufSecond = shuffleArray(this.imagesArr);
   return [...shufFirst,...shufSecond]
  }

  numbersAr(pairs: number, imagesCount: number) {
    const newAr = []
    for (let i = 0; i < this.pairsOnBoard; i++) {
      if (i <= imagesCount) {
        newAr.push(i)
      }else{
        newAr.push(i-imagesCount)
      }
    }
    return newAr
  }

  gameTime(time: string) {
    this.controller.gameTime(time)
  }

  finishData() {
    this.controller.finishData()
  }
}
