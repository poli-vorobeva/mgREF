import './app.scss';
import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';
import { GameField } from './GameField/GameField';
import {rout} from "./Router/Router";
import {Info} from "./Info/Info";
import {Settings} from "./Settings/Settings";
import {RegisterForm} from "./Register/Register";
import {Score} from "./Score/Score";

export class App {
  drawInfoContent(){
    console.log("INFO")
}
  initMainContent(){
     switch(location.hash){
       case('#info'):
         return new Info().init()
         break;
       case('#score'):
         return new Score().init()
         break;
       case('#settings'):
         return new Settings().init()
         break;
       case('#register'):
         return new RegisterForm().init()
         break;
       case('#game'):
         return new GameField().init();
         break
       default:
         return this.drawInfoContent()
     }
   //:document.body.appendChild(this.drawMainContent());
   // location.hash=='#score' && this.drawScore()
   // location.hash=='#settings' && this.drawSettings()
   //  location.hash=='#register' && console.log('register')
   //  location.hash=='#game' && this.drawMainContent()
  }
  init(hash='info') {
    document.body.innerHTML=''
    rout.setHash(location.hash=hash)
    document.body.appendChild(new Header().init());
    document.body.appendChild(this.initMainContent() as Node);
    document.body.appendChild(new Footer().init());
  }
}
