import './styles.scss';
import { App } from './app/app';
import {rout} from "./app/Router/Router";

const app = new App();
app.init();


window.onpopstate=()=>{
  rout.router();

}
