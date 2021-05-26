import {matches} from "./MatchesController";

class Controller {
  firstCard: HTMLElement | undefined
  secondCard: HTMLElement | undefined
  overlapCount: Map<number,number>

  constructor() {
    this.firstCard
    this.overlapCount=new Map<number,number>()
    this.secondCard
  }
  check(index: string, card: HTMLElement):void {
    !this.firstCard ? this.firstCard = card : this.secondCard = card
    if (this.firstCard && this.secondCard) {
      setTimeout(() => {
        const cardOne = '' + (this.firstCard?.childNodes[1].firstChild as HTMLElement).getAttribute('src')
        const cardTwo = '' + (this.secondCard?.childNodes[1].firstChild as HTMLElement).getAttribute('src')
        const pair = this.isPair(cardOne, cardTwo)
        console.log(pair)
        pair ? matches.match(this.firstCard, this.secondCard) : matches.mismatch(this.firstCard, this.secondCard)
        this.firstCard = undefined
        this.secondCard = undefined
      }, 500)
    }
  }
  getAllCardNumbers(number:number):void{
    if(this.overlapCount.has(number)){
       const n = this.overlapCount.get(number)
        n && this.overlapCount.set(number,n+1)

    }else{
      this.overlapCount.set(number,1)
    }
  }
  getAllOverlaps():number{
    let count=0
    for (var [key, value] of this.overlapCount) {
      const check=()=>{
        if(value>=2){
          count=count+Math.floor(value/2)
        }else{
          return
        }
      }
      check()
    }
    matches.setBoardPairs(count)
    return count
  }
  isPair(first: string, second: string) {
    return first === second
  }
}

export const control = new Controller()
