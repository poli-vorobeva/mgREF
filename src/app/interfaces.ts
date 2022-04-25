import Control from "./controll";

export interface IBoard {
  drawModal(): void;
  cardItem(parentNode: HTMLElement, style: string, arInx: number, array: number[]):void
  createCardsBoard(parentNode:HTMLElement,
                   numbersArray: number[], style: string,
                   difficult: number):void
  getImagesArray(number: number): void;
  pairsOnBoard:number
}
export interface IApp {
  initMainContent(hash:string): Promise<Control<HTMLElement>>
  drawMainContent(): Promise<void>
}
export interface ICardItem {
  answer:(answerResult:string)=>void
}
export interface ITimer {
  stopTimer():void
 // getTimeString():string
}
export interface IHelper {
  attribute(name: string, value: string): HTMLElement;
  append(child: HTMLElement | null | string | undefined): this;
  text(txt: string): this;
  html(html: string): this;
  end(): HTMLElement;
}
export interface IInfo {
  descriptionElement(number: string, text: string, parentNode:HTMLElement):void;

  registerInfo(parentNode:HTMLElement): void;

  settingsInfo(parentNode:HTMLElement): void;

  gameInfo(parentNode:HTMLElement): void;
  animateIn(el:HTMLElement):void;
  textDecor(text: string, parentNode: HTMLElement):void
}
export interface IRegister {
  drawErrorDiv(): HTMLElement | void;
  removeErrorDiv(): void;
  init(): HTMLElement;
  validator: IValidator;
  formInputs: HTMLElement[]
  imageSrc:string
}
export interface IFieldSet {
  init(inputs: HTMLElement[]): HTMLElement;
}
export interface IValidator {
  validateField(input:HTMLInputElement):void;
}
export interface IGameField {
  setDifficult(difficult:string):void;
  setStyle(style:string):void;
  currentStyle:string;
}
export interface IController {
  pairsOnBoard(pairs:number):void
  answer(index:number):string
  isComplete():boolean
}
export interface IMatches {
  calculateScore(): number;
  isResolved(): Promise<void>
  mismatch(
    first: HTMLElement | undefined,
    second: HTMLElement | undefined
  ): void;
  match(first: HTMLElement | undefined, second: HTMLElement | undefined): Promise<void>;
}
export interface IHash {
  setHash(hash:string):void
  getHash():string
}
export interface IScore {
  render():Promise<void>
  drawScoreContent(parent:HTMLElement): void;
}
export interface IDownload {
  onGetAvatar:(src:string)=>void
  download(e: Event, parent: HTMLElement): void;
  drawImage(src: string):void
}
export interface IRegisterFields {
  init():HTMLElement
  makeFieldSets(parent: HTMLElement): void
}
