import {__} from "../HelperUtil/HelperUtil";

class Validator{
  init(elements:HTMLElement[]){
    console.log('Validator')
    elements.forEach(element=>{
      console.log(element)
      element.addEventListener('change',this.checkValid)
    })

  }
  checkValid(e: Event){
    let ev=<HTMLInputElement>e.target
    console.log(ev.value)
    console.log(ev.type)
   // let reg = /[^~ ! @ # $ % * () _ — + = | : ; " ' ` < > , . ? / ^]/

  }


}
class ValidateListeners{

}
const validListen= new ValidateListeners()
export const validator= new Validator()

