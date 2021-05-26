import {__} from "../HelperUtil/HelperUtil";
import './Register.scss'
import {validator} from "./Validator";

class FieldSet{
  legend:string
  type:string
  constructor(type:string,legend:string){
    this.legend=legend
    this.type=type

  }
  init(inputs:HTMLElement[]){
    const input= __.create('input','register__input').end()
   input?.setAttribute('type',this.type)
    input?.setAttribute('required','true')
    input?.setAttribute('pattern',
      "[0-9]")
    input?.setAttribute('title','Error')
    // <input
    // type="email"
    // pattern="^[-\w.]+@([A-z0-9][-A-z0-9]+.)+[A-z]{2,4}$"
    // required>
    inputs.push(input as HTMLElement)
    const check= __.create('input','register__checkbox').end()
    check?.setAttribute('type','checkbox')
    check?.setAttribute('disabled','true')
    const p=__.create('p','register__legend').text(this.legend).end()
    const wrp= __.create('div').append(p).append(input).end()
    const fldst= __.create('fieldset','register__fieldset').append(wrp).append(check).end()
    //console.log(fldst)
    return fldst
  }
}
export class RegisterForm{
  inputs:string[][]
  fieldsets:HTMLElement[]
  formInputs:HTMLElement[]

  constructor(){
    this.inputs=[['text','First Name'],['text','Last Name'],['email','Email']]
    this.fieldsets=[]
    this.formInputs=[]
  }
  makeFieldSets(parent:HTMLElement){
    this.inputs.forEach(input=>{
      const fieldset= new FieldSet(input[0],input[1]).init(this.formInputs)
      parent?.append(fieldset as HTMLElement)
    })
  }
  init(){
    const registerWrappper= __.create('section','register__wrapper').end()
    const submitWrapper=__.create('div','submit__wrapper').end()

    const form=__.create('form', 'register__form').end()
    this.makeFieldSets(form as HTMLElement)
    const btnCancel=__.create('button','register__button_cancel').text('Cancel').end()
    const btnSend= __.create('button','register__button_submit').text('Send').end()
    btnSend?.setAttribute('type','sumbit')
    const btnWrapper= __.create('div','register__buttons-wrapper').append(btnCancel).append(btnSend).end()
    const img= __.create('img').attribute('src','./assets/avatar.png')
    const avatar=__.create('div','register__avatar').append(img).end()
    __(submitWrapper).append(avatar).append(btnWrapper).end()
    __(registerWrappper).append(form).append(submitWrapper).append(submitWrapper).end()
    validator.init(this.formInputs)
    return registerWrappper
  }
}
