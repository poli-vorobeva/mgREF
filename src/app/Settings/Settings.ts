import {__} from "../HelperUtil/HelperUtil";
import './Settings.scss'

export class Settings{
  constructor(){

  }
  settingsItem(name:string,options:string[]){

    const h6=__.create('h6').text(name).end()
    const select = __.create('select','settings__item')
    options.forEach(e=>{
      const opt= __.create('option').text(e).attribute('value',e)
      select.append(opt)
    })
    console.log(select)
    const wrap= __.create('div','settings__item-wrapper').append(h6).append(select.end()).end()
    return wrap
  }
  init(){
    const h2= __.create('h2','settings__h1').text('Settings').end()
    const cardsStyle= this.settingsItem('Select game card type',['Animals','Cars'])
    const gameDifficult= this.settingsItem('Difficulty',['easy','middle','hard'])
    const wrapper=__.create('form','settings__wrapper')
      .append(h2)
      .append(cardsStyle)
      .append(gameDifficult).end()

    return wrapper
  }
}
