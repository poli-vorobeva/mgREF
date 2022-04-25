import { IFieldSet } from '../interfaces';
import Control from "../controll";
import { Validator } from './Validator';

export class FieldSet extends Control{
  validator: Validator;
  isCorrectField: boolean;
  // @ts-ignore
  showErrorDiv:(str:string)=>void
  // @ts-ignore
  sendData:(data:{value:string,id:string})=>void
  constructor(parentNode:HTMLElement,type: string, legend: string, id: string) {
    super(parentNode)
    this.isCorrectField = false
    this.validator = new Validator()
    const fldst = new Control(parentNode, 'fieldset', 'register__fieldset')
    const wrp = new Control(fldst.node, 'div')
    const input = new Control(wrp.node, 'input', 'register__input');
    input.node.setAttribute('type', type);
    input.node.setAttribute('required', 'true');

    const check = new Control(fldst.node, 'input', 'register__checkbox')
    check.node.setAttribute('type', 'checkbox');
    check.node.setAttribute('disabled', 'true');
    const p = new Control(wrp.node, 'p', 'register__legend', legend)

    input.node.addEventListener('input', (e) => {
      this.isCorrectField = this.validator.validateField(e.target as HTMLInputElement)
        !this.isCorrectField
          ? this.showErrorDiv('123456789~!@#$%*()_—+=|:;"\'`<>,.?')
          :this.showErrorDiv('')

    })
    input.node.addEventListener('change',()=>{
      if(this.isCorrectField){
        (check.node as HTMLInputElement).checked=true
        this.sendData({value:(input.node as HTMLInputElement).value,id:id})
      }
    })
  }
}
