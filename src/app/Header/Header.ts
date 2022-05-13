import './Header.scss';
import { IObserver, observer } from '../Observer';
import { hashEl } from '../Hash';
import Control from "../controll";

export class Header extends Control {
  navItems: { [key:string]:string }[];
  navWrapper: HTMLElement | undefined;
  gameBtn: HTMLElement | undefined;
  observer:IObserver;

  constructor(parentNode:HTMLElement) {
    super(parentNode,'header','header')
    this.navItems = [
      { name: 'info', address: './assets/header__icons/Info.svg' },
      { name: 'score', address: './assets/header__icons/Score.svg' },
      { name: 'settings', address: './assets/header__icons/Settings.svg' },
    ];
    this.navWrapper = undefined;
    this.gameBtn = undefined;
    this.observer = observer;
    const button = new Control(this.node,'button', 'button__game game')
    const buttonContent = new Control(button.node,'span','','Match Game')
    buttonContent.node.setAttribute('data-hash', '#game');
    const navClickHash=(hash:string)=>{
      hashEl.setHash(hash);
      observer.dispatch('hash');
    }
    buttonContent.node.onclick=() => navClickHash('#game')
    const ul = new Control(this.node,'ul','nav__items')
    for (let i = 0; i < this.navItems.length; i++) {
      const li = new Control(ul.node,'li',`nav__item ${this.navItems[i].name}`)
      const span = new Control(li.node,'span')
      const title = new Control(li.node,'span', 'nav__title',this.navItems[i].name)
      li.node.setAttribute('data-hash', this.navItems[i].name);
      li.node.onclick=() => navClickHash(this.navItems[i].name)
    }
    const buttonRegister = new Control(this.node,'button', 'button__register register')
    const buttonText = new Control(buttonRegister.node,'span','','Register New Player');
    buttonRegister.node.onclick= () => navClickHash('#register')
    observer.addListener('avatar', () => {
      if (window.localStorage.photo) {
        const img= new Control(this.node,'img','header__avatar')
        img.node.setAttribute('src', window.localStorage.photo);
      }
    });
    observer.addListener('game', () => {
      button.node.setAttribute('style', 'top:0');
    });
  }
}
