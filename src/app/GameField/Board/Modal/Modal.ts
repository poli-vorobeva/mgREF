import './Madal.scss';
import { observer } from '../../../Observer';
import { hashEl } from '../../../Hash';
import Control from '../../../controll';

export class Modal extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode,'section', 'modal__wrapper')
    const modal = new Control(this.node,'div', 'modal','Поздравляем')
    const btn =new Control(modal.node,'btn', 'modal__btn','OK')
    btn.node.onclick= () => {
      hashEl.setHash('#score');
      observer.dispatch('hash');
    }
  }
}