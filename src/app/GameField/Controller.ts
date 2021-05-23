export class Controller {
  firstCard: HTMLElement | undefined
  secondCard: HTMLElement | undefined

  constructor() {
    this.firstCard
    this.secondCard
  }

  check(index: string, card: HTMLElement) {
    !this.firstCard ? this.firstCard = card : this.secondCard = card
    console.log('___', this.firstCard.childNodes[1])
    if (this.firstCard && this.secondCard) {
      setTimeout(() => {
        const cardOne = '' + (this.firstCard?.childNodes[1].firstChild as HTMLElement).getAttribute('src')
        const cardTwo = '' + (this.secondCard?.childNodes[1].firstChild as HTMLElement).getAttribute('src')
        console.log(cardOne, cardTwo)
        const pair = this.isPair(cardOne, cardTwo)
        // console.log(this.firstCard,'-',this.secondCard)
        pair ? this.match(this.firstCard, this.secondCard) : this.mismatch(this.firstCard, this.secondCard)
        this.firstCard = undefined
        this.secondCard = undefined
      }, 500)
    }
  }

  mismatch(first: HTMLElement | undefined, second: HTMLElement | undefined) {
    //console.log('mis-',first?.childNodes[1].childNodes)
    //first.childNodes[1].childNodes[0].style.backgroundColor='linear-gradient(50% black transparent)'
    setTimeout(() => {
      first?.classList.remove('flipped')
      second?.classList.remove('flipped')
    })
  }

  match(first: HTMLElement | undefined, second: HTMLElement | undefined) {
    //console.log(first,'%%%')
    //first.closest('.card__back-gradient').style.backgroundColor='linear-gradient(15deg, red,transparent)'
    //console.log('Match-',first,second)
  }

  isPair(first: string, second: string) {
    console.log(first === second)

    return first === second
  }
}
