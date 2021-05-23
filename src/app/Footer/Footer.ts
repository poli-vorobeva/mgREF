import './Footer.scss';
import {__} from "../HelperUtil/HelperUtil";

export class Footer {
  init() {
    const footer = __.create('footer', 'footer').text('Footer').end()
    return <HTMLElement>footer
  }
}
