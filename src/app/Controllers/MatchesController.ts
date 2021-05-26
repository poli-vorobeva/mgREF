import {storage} from "../../index";

class MatchesController{

  matchedPairs:number
  boardPairs:number
  mismatches:number
  matches:number

  constructor(){
    this.matchedPairs=0
    this.boardPairs=0
    this.mismatches=0
    this.matches=0
  }
  setBoardPairs(number:number){
    this.boardPairs=number
  }
  calculateScore(){}
  isResolved(){
    this.matchedPairs==this.boardPairs && storage.saveResult({user:{
        firstName: 'tom',
        lastName: 'ford',
        email: 'kv@bg.d',
      },score:300
    })
  }
  mismatch(first: HTMLElement | undefined, second: HTMLElement | undefined) {
    this.mismatches=this.mismatches+1
    setTimeout(() => {
      first?.classList.remove('flipped')
      second?.classList.remove('flipped')
    })
  }
  match(first: HTMLElement | undefined, second: HTMLElement | undefined) {

    this.matches=this.matches+1
    const n= this.matchedPairs

    this.matchedPairs= n+1
    this.isResolved()
  }
}
export const matches=new MatchesController()
