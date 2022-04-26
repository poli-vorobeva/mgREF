import { ITimer } from '../../interfaces';
// import { app } from '../../app';
// import DateTimeFormat = Intl.DateTimeFormat;
import { ITimerController, TimerController } from '../../Controllers/TimerController';
import { observer } from '../../Observer';
import { hashEl } from '../../Hash';
import Control from "../../controll";
// import { drawMainContent, initMainContent } from '../../app';

export class Timer extends Control implements ITimer {
  timerController:ITimerController;
  private hourString: Control<HTMLElement>;

  constructor(parentNode:HTMLElement) {
    super(parentNode)
    const timer= new Control(parentNode,'div', 'timer')
    this.hourString = new Control(timer.node,'div', 'timer__string','TIMER')
    this.timerController = new TimerController(this.hourString.node)
    const stpBtn = new Control(timer.node,'button', 'button__stop','Stop Game')
    stpBtn.node.addEventListener('click', () => {
      this.timerController.stopTimer();
      hashEl.setHash();
      observer.dispatch('hash');
    });
  }
  startTimer(){
    this.timerController.start()
  }
  // getTimeString():string {
  //   return this.timeString?.innerText as string;
  // }

  stopTimer():string {
    return this.hourString.node.innerText
  //  this.timerController?.stopTimer();
  }
}
