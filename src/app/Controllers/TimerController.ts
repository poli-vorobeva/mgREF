import { Timer } from '../GameField/Timer/Timer';

export interface ITimerController {
  start():void;
  generateCurrentTime(startTime:number):string
  stopTimer():void
}
export class TimerController implements ITimerController {
  startTimePoint:number|null;
  intervalFunction: () => void;
  interval: NodeJS.Timeout;

  constructor(timerWrapper:HTMLElement) {
    //this.startTimePoint = +new Date();
    this.intervalFunction=()=>{
        timerWrapper.innerText = this.generateCurrentTime(this.startTimePoint as number);
    }
    //this.interval=setInterval(this.intervalFunction, 1000);

  }
  generateCurrentTime(startTime:number):string {
    return new Date(+new Date() - startTime).toLocaleTimeString('en-GB', { timeZone: 'UTC' });
  }
start(){
  this.startTimePoint = +new Date();
  this.interval=setInterval(this.intervalFunction, 1000);
}
  stopTimer():void {
    clearInterval(this.interval);
    this.startTimePoint = null;
  }
}
