
import './Settings.scss';
import { observer } from '../Observer';
import { IGameField } from '../interfaces';
import Control from "../controll";

export class Settings extends Control{
  currentSettings: Record<string, string>;
  cardsStyle: string[];
  difficult: string[];
  onChangeSetting: (setting: string, value: string) => void;
  constructor(parentNode:HTMLElement,currentSettings:Record<string, string>) {
    super(parentNode)
    this.currentSettings=currentSettings
    this.cardsStyle=['animals', 'cars']
    this.difficult=['easy','middle','hard']
    const form = new Control(parentNode,'form', 'settings__wrapper')
    const h2 = new Control(form.node,'h2', 'settings__h1','Settings')
    this.settingsItem('Select game card type',this.cardsStyle,'cardStyle',form.node);
    this.settingsItem('Difficulty',this.difficult,'difficulty',form.node);
  }
  settingsItem(name: string,options: string[],data: string,parent:HTMLElement){
    const settingItem= new Control(parent,'div', 'settings__item-wrapper')
    const h6 = new Control(settingItem.node,'h6','',name);
    const select = new Control(settingItem.node,'select', 'settings__item');
    options.forEach((e) => {
      const opt = new Control(select.node,'option','',e)
    });
   select.node.onchange=(e)=>{
     this.onChangeSetting(data,(e.target as HTMLSelectElement).value)
   }
  }
}
