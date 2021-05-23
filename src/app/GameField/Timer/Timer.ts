import {__} from "../../HelperUtil/HelperUtil";

export class Timer{
  hour:string
  minutes:string
  seconds:string
  check:Function

  constructor() {
    this.hour = '00'
    this.minutes = '00'
    this.seconds = '00'
    this.check = (el: string)=> {
      let num
      const n = +el + 1
      if (n < 10) {
        num= '0' + n
      } else {
        num = n + ''
        if (n > 12) {
          num = '00'
        }
      }
      return num
    }
  }
  hr(){
    const num=this.check(this.hour)
    this.hour=num
    if(+this.hour>23){
      this.hour='00'
    }
  }
  min(){
    const num=this.check(this.minutes)
    this.minutes=num
    num=='00' && this.hr()
  }
  sec(){
    let number=this.check(this.seconds)
    number=='00' && this.min()
    this.seconds=this.check(this.seconds)
  }
  start(){
    setInterval(()=>{
      this.sec()
      return this.init()
     // console.log(this.hour,this.minutes,this.seconds)
    },1000)
  }
  init():HTMLElement{
    const hourString=__.create('div','timer__string').text(`${this.hour}.${this.minutes}.${this.seconds}`).end()
    const timer= __.create('div','timer').append(hourString).end()
    return <HTMLElement>timer
  }
}
