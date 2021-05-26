import {__} from "../../HelperUtil/HelperUtil";

export class Timer{
  hour:string
  minutes:string
  seconds:string
  check:Function
  timerContainerClass: string
  interval:Object|undefined
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
    this.timerContainerClass='.timer__string'
    this.interval
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
  startTimer(){
   this.interval=setInterval(()=>{
      this.sec()
      const el=document.querySelector(this.timerContainerClass) as HTMLElement
      el.innerText=`${this.hour}:${this.minutes}:${this.seconds}`
    },1000)
  }
  stopTimer(){
    clearInterval(<NodeJS.Timeout>this.interval)
  }
  init():HTMLElement{
    // setInterval(()=>{
    //   this.sec()
    //   return this.init()
    // },1000)
    const hourString=__.create('div','timer__string').text(`${this.hour}.${this.minutes}.${this.seconds}`).end()
    const timer= __.create('div','timer').append(hourString).end()
    return <HTMLElement>timer
  }
}
export const timer= new Timer()
