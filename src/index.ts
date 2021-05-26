import './styles.scss';
import { App } from './app/app';
import {rout} from "./app/Router/Router";
import {IdbStorage} from "./app/Storage/Storage";

export const app = new App();
app.init();
window.onpopstate=()=>{
 rout.subscribe()
}
export const storage = new IdbStorage("poli8512");
export const user = {
  photo: "",
  name: "Jhon",
  email: "user@example.com",
};
