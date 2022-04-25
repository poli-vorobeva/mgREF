import { IRegister, IRegisterFields } from '../interfaces';
import { FieldSet } from './FieldSet';
import Control from "../controll";

export class RegisterFields extends Control {
  inputs:string[][];
  // @ts-ignore
  showErrorDiv:(str:string)=>void
  // @ts-ignore
  sendData:(data:{value:string,id:string})=>void
  constructor(parentNode:HTMLElement) {
    super(parentNode)
    this.inputs = [
      ['text', 'First Name', 'firstName'],
      ['text', 'Last Name', 'lastName'],
      ['email', 'Email', 'email'],
    ];
    const fieldsWrapper = new Control(parentNode,'div', 'register__fields')
    this.inputs.forEach((input) => {
      const fieldSet = new FieldSet(fieldsWrapper.node,input[0],input[1],input[2]);
      fieldSet.showErrorDiv=(str)=>{
        this.showErrorDiv(str)
      }
      fieldSet.sendData=(data)=>{
        this.sendData(data)
      }
    });
  }
}
