import './Info.scss';
import {IInfo} from '../interfaces';
import {svgInfo} from '../svg';
import Control from "../controll";

export class Info extends Control implements IInfo {
  icon: string;

  infoDescription: string;

  registerImg: string;

  constructor(parentNode: HTMLElement) {
    super(parentNode)
    this.icon = svgInfo;
    this.infoDescription = 'Start you new game! Remember card positions and match it before times up.';
    this.registerImg = './assets/infoImg/image%201.png';
    const wrapper = new Control(parentNode, 'section', 'info__wrapper')
    const h6 = new Control(wrapper.node, 'h6', 'info__h6')
    this.textDecor('How to play?', h6.node)
    const wrap = new Control(wrapper.node, 'div', 'info__items__wrapper')
    this.registerInfo(wrap.node);
    this.settingsInfo(wrap.node);
    this.gameInfo(wrap.node);
  }

  descriptionElement(number: string, text: string, parent: HTMLElement) {
    const descriptionDiv = new Control(parent, 'div')
    const p = new Control(descriptionDiv.node, 'p', 'info__item-descrEl')
    const s = new Control(p.node, 'span', 'info__item-descrEl', number)
    const txt = new Control(descriptionDiv.node, 'p', 'info__item-descrEl-p', text)
  }

  registerInfo(parentNode: HTMLElement) {
    const div = new Control(parentNode, 'div', 'info__register info__item')
    const descr = new Control(div.node, 'div', 'info__item-el')
    this.descriptionElement('1', 'Register new player in game', descr.node)
    const content = new Control(div.node, 'div', 'info__item-el')
    const img = new Control(content.node, 'img')
    img.node.setAttribute('src', this.registerImg);
    this.animateIn(div.node)
  }

  settingsInfo(parentNode: HTMLElement) {
    const div = new Control(parentNode, 'div', 'info__settings info__item')
    const sett = new Control(div.node, 'div', 'info__item-el')
    this.descriptionElement('2', 'Configure your game settings', sett.node);
    const content = new Control(div.node, 'div', 'info__item-el')
    const button = new Control(content.node, 'button')
    const svg = new Control(button.node, 'span', 'nav__item_svg')
    svg.node.innerHTML = this.icon
    const p = new Control(button.node, 'p', '', 'Game Settings')
    this.animateIn(div.node)
  }

  gameInfo(parentNode: HTMLElement) {
    const div = new Control(parentNode, 'div', 'info__game info__item')
    const gm = new Control(div.node, 'div', 'info__item-el')
    this.descriptionElement('3', this.infoDescription, gm.node)
    const content = new Control(div.node, 'div', 'info__item-el')
    const img = new Control(content.node, 'img')
    img.node.setAttribute('src', './assets/infoImg/image%204.png');
    this.animateIn(div.node)
  }

  textDecor(text: string, parentNode: HTMLElement) {
    const wrapperTextDecor = new Control(parentNode, 'div', 'textDecor__wrapper')
    for (let i = 0; i < 20; i++) {
      const cell = new Control(wrapperTextDecor.node, 'div', 'textCell')
    }
    const content = new Control(wrapperTextDecor.node, 'div', 'contentTextDecor')
    for (let i = 0; i < 8; i++) {
      const textEl = new Control(content.node, 'div', 'cssText', text)
    }
  }

  animateIn(el: HTMLElement) {
    setTimeout(() => {
      el.style.transform = 'translateX(0px)'
      el.style.opacity = '1'
    }, 1000)
  }

}
