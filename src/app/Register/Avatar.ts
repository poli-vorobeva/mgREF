import { IDownload, IRegister } from '../interfaces';
import { DownloadImage } from './DownloadImage';
import Control from "../controll";

export interface IRegisterAvatar {
  init():HTMLElement
}
export class RegisterAvatar extends Control{

  downloadImage:IDownload;

  avatar:HTMLElement|undefined;
  // @ts-ignore
  onGetAvatar:(src:string)=>void
  constructor(parentNode:HTMLElement) {
    super(parentNode)
    this.downloadImage = new DownloadImage();
    this.downloadImage.onGetAvatar=(src:string)=>{
this.onGetAvatar(src)
    }
    this.avatar = undefined;
    const submitWrapper = new Control(parentNode,'div', 'submit__wrapper')
    const avatar = new Control(submitWrapper.node,'div', 'register__avatar')
    const img =new Control(avatar.node,'img')
    img.node.setAttribute('src', './assets/avatar.png');
    const plusEl = new Control(avatar.node,'div', 'plus')
    const plusSpan = new Control(plusEl.node,'span','','+')
    const inputLoad = new Control(plusEl.node,'input', 'register__load-input')
    inputLoad.node.setAttribute('type', 'file');
    inputLoad.node.addEventListener('change',(e) => {
      console.log(e)
      this.downloadImage.download(e as Event, avatar.node);
    },false);

    const btnWrapper = new Control(submitWrapper.node,'div', 'register__buttons-wrapper')
    const btnCancel = new Control(btnWrapper.node,'button', 'register__button_cancel','Cancel')
    const btnSend = new Control(btnWrapper.node,'button', 'register__button_submit','Send')
    btnSend.node.setAttribute('type', 'submit');
  }
}
