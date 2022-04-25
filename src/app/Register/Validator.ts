import {IRegister, IValidator} from '../interfaces';
import {observer} from '../Observer';
import {hashEl} from '../Hash';
import {LocalStorage} from '../LocalStorage';

export class Validator implements IValidator {
  emailPattern: RegExp;
  textPattern: RegExp;
  firstName: string | undefined;

  lastName: string | undefined;

  email: string | undefined;

  constructor() {
    this.textPattern = /[123456789~!@#$%*()_—+=|:;"'`<>,.?]/i;
    this.emailPattern = /[^123456789~!@#$%*()_—+=|:;"'`<>,.?]+@[^123456789~!@#$%*()_—+=|:;"'`<>,.?]+\.[^123456789~!@#$%*()_—+=|:;\"'`<>,.?]{1,5}/i;
  }

  validateField(input: HTMLInputElement) {
    if (input.value.trim().length === 0) return true
    if (input.type === 'text') {
      return !input.value.match(this.textPattern)
    } else if (input.type === 'email') {
      return !!input.value.match(this.emailPattern)
    }else{
      return true
    }
  }
}
