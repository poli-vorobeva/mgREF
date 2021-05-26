import {__} from "../HelperUtil/HelperUtil";
import './Info.scss'

export class Info{
  constructor(){

  }
descriptionElement(number:string,text:string){
    const s= __.create('span','info__item-descrEl').text(number).end()
    const p= __.create('p','info__item-descrEl').append(s).end()
    const txt= __.create('p','info__item-descrEl-p').text(text).end()
    const div=__.create('div').append(p).append(txt).end()
    return div
}
registerInfo(){
    ///const description ==__.create('div','info__register-description').text('описание').end()
    const descrContent= this.descriptionElement('1','Register new player in game')
    const descr= __.create('div','info__item-el').append(descrContent).end()
   const img= __.create('img').attribute('src','./assets/infoImg/image%201.png')
    const content= __.create('div','info__item-el').append(img).end()
    const div= __.create('div',['info__register','info__item']).end()
    return __(div).append(descr).append(content).end()
}
settingsInfo(){
    const icon= '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
      '<path fill-rule="evenodd" clip-rule="evenodd" d="M12.7487 8.62401C12.7727 8.42401 12.7887 8.21601 12.7887 8.00001C12.7887 7.78401 12.7727' +
      ' 7.57601 12.7407 7.37601L14.0927 6.32001C14.2127 6.22401 14.2447 6.04801 14.1727 5.91201L12.8927 3.69601C12.8127 3.55201 12.6447 3.50401' +
      ' 12.5007 3.55201L10.9087 4.19201C10.5727 3.93601 10.2207 3.72801 9.82874 3.56801L9.58874 1.87201C9.56474 1.71201 9.42874 1.60001 9.26874 ' +
      '1.60001H6.70874C6.54874 1.60001 6.42074 1.71201 6.39674 1.87201L6.15674 3.56801C5.76474 3.72801 5.40474 3.94401 5.07674 4.19201L3.48474 ' +
      '3.55201C3.34074 3.49601 3.17274 3.55201 3.09274 3.69601L1.81274 5.91201C1.73274 6.05601 1.76474 6.22401 1.89274 6.32001L3.24474 ' +
      '7.37601C3.21274 7.57601 3.18874 7.79201 3.18874 8.00001C3.18874 8.20801 3.20474 8.42401 3.23674 8.62401L1.88474 9.68001C1.76474 9.77601 ' +
      '1.73274 9.95201 1.80474 10.088L3.08474 12.304C3.16474 12.448 3.33274 12.496 3.47674 12.448L5.06874 11.808C5.40474 12.064 5.75674 12.272' +
      ' 6.14874 12.432L6.38874 14.128C6.42074 14.288 6.54874 14.4 6.70874 14.4H9.26874C9.42874 14.4 9.56474 14.288 9.58074 14.128L9.82074 12.' +
      '432C10.2127 12.272 10.5727 12.056 10.9007 11.808L12.4927 12.448C12.6367 12.504 12.8047 12.448 12.8847 12.304L14.1647 10.088C14.2447 9.94401' +
      ' 14.2127 9.77601 14.0847 9.68001L12.7487 8.62401ZM7.98873 10.4C6.66874 10.4 5.58874 9.32001 5.58874 8.00001C5.58874 6.68001 6.66874 5.60001' +
      ' 7.98873 5.60001C9.30873 5.60001 10.3887 6.68001 10.3887 8.00001C10.3887 9.32001 9.30873 10.4 7.98873 10.4Z" fill="#1dcaea"/>\n' +
      '</svg>'

    const descrContent= this.descriptionElement('2','Configure your game settings')
    const sett= __.create('div','info__item-el').append(descrContent).end()
    const p= __.create('p').text('Game Settings').end()
    const svg=__.create('span','nav__item_svg').html(icon).end()
    const button= __.create('button').append(svg).append(p).end()
    const content= __.create('div','info__item-el').append(button).end()
    const div= __.create('div',['info__settings','info__item']).end()
    return __(div).append(sett).append(content).end()
  }
gameInfo(){
    const descrContent= this.descriptionElement('3','Start you new game! Remember card positions and match it before times up.')
    const gm= __.create('div','info__item-el').append(descrContent).end()
    const img= __.create('img').attribute('src','./assets/infoImg/image%204.png')
    const content= __.create('div','info__item-el').append(img).end()
    const div= __.create('div',['info__game','info__item']).end()
    return __(div).append(gm).append(content).end()
  }
  init(){
    const h6= __.create('h6','info__h6').text('How to play?').end()

    const registerInfo =this.registerInfo()
    const infoSettings =this.settingsInfo()
    const gameInfo= this.gameInfo()

    const itemsWrapper=__.create('div','info__items__wrapper').end()
   const wrap=__(itemsWrapper).append(registerInfo).append(infoSettings).append(gameInfo).end()
    const wrapper=__.create('section','info__wrapper').end()
      __(wrapper).append(h6).append(wrap).end()
    return wrapper
  }
}
