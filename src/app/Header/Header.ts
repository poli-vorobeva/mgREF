import './Header.scss'
import {__} from "../HelperUtil/HelperUtil";
import {rout} from "../Router/Router";
import set = Reflect.set;

window.onpopstate=()=>{
  console.log(location.hash)
}
export class Header{
  navItems:string[]
  navItemsIocns:string[]

  constructor(){
    this.navItems=['Info','Score','Settings']
    this.navItemsIocns=['<svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
    '<path d="M3.38379 9.39648C3.39551 8.69922 3.47461 8.14844 3.62109 7.74414C3.76758 7.33984 4.06641 6.8916 4.51758 6.39941L5.66895 5.' +
    '21289C6.16113 4.65625 6.40723 4.05859 6.40723 3.41992C6.40723 2.80469 6.24609 2.32422 5.92383 1.97852C5.60156 1.62695 5.13281 1.45117 4.51758' +
    ' 1.45117C3.91992 1.45117 3.43945 1.60938 3.07617 1.92578C2.71289 2.24219 2.53125 2.66699 2.53125 3.2002H0.905273C0.916992 2.25098 1.25391 1.48633' +
    ' 1.91602 0.90625C2.58398 0.320312 3.45117 0.0273438 4.51758 0.0273438C5.625 0.0273438 6.48633 0.326172 7.10156 0.923828C7.72266 1.51562 8.0332 ' +
    '2.33008 8.0332 3.36719C8.0332 4.39258 7.55859 5.40332 6.60938 6.39941L5.65137 7.34863C5.22363 7.82324 5.00977 8.50586 5.00977 9.39648H3.38379ZM3' +
    '.31348 12.1826C3.31348 11.9189 3.39258 11.6992 3.55078 11.5234C3.71484 11.3418 3.95508 11.251 4.27148 11.251C4.58789 11.251 4.82812 11.3418' +
    ' 4.99219 11.5234C5.15625 11.6992 5.23828 11.9189 5.23828 12.1826C5.23828 12.4463 5.15625 12.666 4.99219 12.8418C4.82812 13.0117 4.58789 13.0967' +
    ' 4.27148 13.0967C3.95508 13.0967 3.71484 13.0117 3.55078 12.8418C3.39258 12.666 3.31348 12.4463 3.31348 12.1826Z" fill="#2196F3"/>',
      '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.99 0C4.47 0 0 4.48 0 10C0 15.52 ' +
      '4.47 20 9.99 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 9.99 0ZM14.23 16L10 13.45L5.77 16L6.89 11.19L3.16 7.96L8.08 7.54L10 3L11.92 7.53L16.84' +
      ' 7.95L13.11 11.18L14.23 16Z" fill="white" fill-opacity="1"/></svg>',
      '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
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
      ' 7.98873 5.60001C9.30873 5.60001 10.3887 6.68001 10.3887 8.00001C10.3887 9.32001 9.30873 10.4 7.98873 10.4Z" fill="#2F80ED"/>\n' +
      '</svg>\n'
]
  }
  drawRegisterButton():HTMLElement{
    const buttonText = __.create('span').text('Register New Player').end()
    const button = __.create('button',['button__register','register']).append(buttonText).end()
    return <HTMLElement>button
  }
  drawMatchButton():HTMLElement|null{
    const buttonContent = __.create('span').text('Match Game').end()
    const button =__.create('button',['button__game','game']).append(buttonContent).end()
    return button
  }
  drawNav():HTMLElement{

    const nav= __.create('nav','nav__wrapper')
    const ul= __.create('ul','nav__items')
    for(let i=0;i<this.navItems.length;i++){
      const p= __.create('p').text(this.navItems[i]).end()
      const svg=__.create('span','nav__item_svg').html(this.navItemsIocns[i]).end()
      const clsN=this.navItems[i].toLowerCase()
      const li= __.create('li',[`nav__item`,clsN]).append(svg).append(p).end()
      ul.append(li)
    }
   setTimeout(()=>rout.subscribe(),0)
   return <HTMLElement>ul.end()
  }
  init():HTMLElement{
    const nav= this.drawNav()
    const header = __.create('header','header')
                  .append(this.drawMatchButton())
                  .append(nav)
                  .append(this.drawRegisterButton()).end()
    rout.setListeners(<HTMLElement>header)
    return <HTMLElement>header
}
}
