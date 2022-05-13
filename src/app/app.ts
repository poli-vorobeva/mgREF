import './app.scss';
import {Header} from './Header/Header';
//import {Footer} from './Footer/Footer';
import {Info} from './Info/Info';
import {Settings} from './Settings/Settings';
import {RegisterForm} from './Register/Register';
import {Score} from './Score/Score';
import {hashEl} from './Hash';
import {
  IApp,
  IGameField,
  IRegister,
} from './interfaces';
import {GameStorage, IdbStorage, User} from './Storage/Storage';
import {GameField} from './GameField/GameField';
import {observer} from './Observer';
import Control from "./controll";

export class App extends Control implements IApp {
  hashDefault: string;
  storage: GameStorage;
  header: Header;
  mainContainer: Control<HTMLElement>;
  parentNode: HTMLElement;
  currentSettings: Record<string, string>;
userData:User
  constructor(parentNode: HTMLElement) {
    super(parentNode)
    this.userData=JSON.parse(window.localStorage.getItem('user'))
    this.parentNode = parentNode
    this.header = new Header(parentNode);
    this.mainContainer = new Control(parentNode, 'main', 'main')
    this.hashDefault = '#info';
    //this.score = new Score();
    this.storage = new IdbStorage('poli8512');
    this.currentSettings = {
      difficulty: 'easy',
      cardStyle: 'animals'
    }

    observer.addListener('hash', async () => {
      await this.drawMainContent()
    });
    hashEl.setHash();
    observer.dispatch('hash');
    // document.body.appendChild(new Footer().init());
  }

  async initMainContent(hash = this.hashDefault): Promise<Control<HTMLElement>> {
    const h = hash || window.location.hash;
    console.log("HHHH",h)
    switch (h) {
      case '#info':
        this.mainContainer.destroy()
        this.mainContainer = new Control(this.parentNode, 'main', 'main')
        return new Info(this.mainContainer.node);
      case '#score':
        this.mainContainer.destroy()
        this.mainContainer = new Control(this.parentNode, 'main', 'main')
        const storageResults=this.storage.getResults()
        return storageResults.then(data=>{
          return new Score(this.mainContainer.node,data);
        })
      case '#settings':
        this.mainContainer.destroy()
        this.mainContainer = new Control(this.parentNode, 'main', 'main')
        const settings = new Settings(this.mainContainer.node, this.currentSettings);
        settings.onChangeSetting = (setting, value) => {
          this.currentSettings[setting] = value
        }
        return settings
      case '#register':
        this.mainContainer.destroy()
        this.mainContainer = new Control(this.parentNode, 'main', 'main')
        const registerForm = new RegisterForm(this.mainContainer.node)
        registerForm.onNewUserData=(user)=>{
          this.userData=user
          window.localStorage.setItem('user',JSON.stringify(this.userData))
        }
        return registerForm
      case '#game':
        this.mainContainer.destroy()
        this.mainContainer = new Control(this.parentNode, 'main', 'main')
        const gameField = new GameField(this.mainContainer.node, this.currentSettings);
        gameField.onGameComplete = async () => {
          //  this.onGameComplete()
          const result = gameField.finishData()
         await this.storage.saveResult(  {user:this.userData,score:result})
          const results=await this.storage.getResults()
          setTimeout(() => {
            gameField.destroy()
            const scorePage = new Score(this.mainContainer.node,results)
          }, 500)

        }
        return gameField;
      default:
        this.mainContainer.destroy()
        this.mainContainer = new Control(this.parentNode, 'main', 'main')
        return new Info(this.mainContainer.node);
    }
  }

  onGameComplete() {

  }

  async drawMainContent(): Promise<void> {
    const content = await this.initMainContent(hashEl.getHash());
  }

}
