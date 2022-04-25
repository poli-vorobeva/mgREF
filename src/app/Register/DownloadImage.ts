import { IDownload, IRegister } from '../interfaces';

export class DownloadImage implements IDownload {
  url: string;

  parent: HTMLElement | undefined;
  // @ts-ignore
  onGetAvatar:(src:string)=>void

  constructor() {
  //  this.ancestor = ancestor;
    this.url = '';
    this.parent = undefined;
  }

  drawImage(src: string):void {
    const img = new Image();
    img.src = src;
    img.classList.add('avatar__img');
    this.parent?.appendChild(img);
  }

  download(e: Event, parent: HTMLElement):void {
    this.parent = parent;
    const f: FileList | null = (<HTMLInputElement>e.target).files;
    if (f) {
      const file: Blob = f[0];
      const reader = new FileReader();

      reader.onload = () => {
        const src: string | ArrayBuffer | null = reader.result;
        this.drawImage(src as string);
        this.onGetAvatar(src as string)
       // this.ancestor.imageSrc = src as string;
      };
      reader.readAsDataURL(file);
    }
  }
}
