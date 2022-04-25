import { IHash } from './interfaces';

class Hash implements IHash {
  defaultHash:string;

  constructor() {
    this.defaultHash = '#info';
  }

  setHash(hash:string = this.defaultHash):void {
    window.location.hash = hash;
  }

  getHash():string {
    return window.location.hash;
  }
}
export const hashEl = new Hash();
