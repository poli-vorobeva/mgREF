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
import {GameStorage, IdbStorage} from './Storage/Storage';
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

  constructor(parentNode: HTMLElement) {
    super(parentNode)
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
    switch (h) {
      case '#info':
        this.mainContainer.destroy()
        this.mainContainer = new Control(this.parentNode, 'main', 'main')
        return new Info(this.mainContainer.node);
      case '#score':
        this.mainContainer.destroy()
        this.mainContainer = new Control(this.parentNode, 'main', 'main')
        return new Score(this.mainContainer.node);
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
        return new RegisterForm(this.mainContainer.node)
      case '#game':
        this.mainContainer.destroy()
        this.mainContainer = new Control(this.parentNode, 'main', 'main')
        const gameField = new GameField(this.mainContainer.node, this.currentSettings);
        gameField.onGameComplete = () => {
          //  this.onGameComplete()
          setTimeout(() => {
            console.log(gameField.finishData())
            gameField.destroy()
            new Score(this.mainContainer.node)
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
