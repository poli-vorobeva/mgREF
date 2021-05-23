import './app.scss';
import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';
import { GameField } from './GameField/GameField';

export class App {
  drawHeader(): HTMLElement {
    return new Header().init();
  }

  drawFooter() {
    return new Footer().init();
  }

  drawMainContent() {
    return new GameField().init();
  }

  init() {
    document.body.appendChild(this.drawHeader());
    document.body.appendChild(this.drawMainContent());
    document.body.appendChild(this.drawFooter());
  }
}
