import './Register.scss';
import {Validator} from './Validator';
import {IRegister, IValidator} from '../interfaces';
import {RegisterAvatar} from './Avatar';
import {RegisterFields} from './RegisterFields';
import Control from "../controll";
import { hashEl } from '../Hash';
import { observer } from '../Observer';
import {User} from "../Storage/Storage";

export class RegisterForm extends Control {

  formInputs: HTMLElement[];

  wrapper: HTMLElement | undefined;

  errorDiv: HTMLElement | undefined | null;

  inputsData: User
  onNewUserData:(user:User)=>void
  constructor(parentNode: HTMLElement) {
    super(parentNode)
    this.inputsData={
      firstName:'',
      lastName:'',
      email:'',
      photo:''
    }
    this.formInputs = [];
    const errDiv = new Control(parentNode,'div',
      'register__error')
    errDiv.node.style.display='none'
    const registerWrapper = new Control(this.node, 'section', 'register__wrapper')
    const form = new Control(registerWrapper.node, 'form', 'register__form')
      form.node.addEventListener('submit',(e) => {
        this.onNewUserData(this.inputsData)
        hashEl.setHash();
        observer.dispatch('hash');
      },false);
    const fields = new RegisterFields(form.node);
    fields.showErrorDiv=(str)=>{
      if(str){
        errDiv.node.style.display='block'
        errDiv.node.innerText=`Do not use ${str}`
      } else{
        errDiv.node.style.display='none'
        errDiv.node.innerText=''
      }
    }
    fields.sendData=(data)=>{
      this.inputsData[data.id as keyof User]=data.value
    }
    const avatar = new RegisterAvatar(form.node);
    avatar.onGetAvatar = (src) => {
      this.inputsData.photo = src
    }
  }
}
