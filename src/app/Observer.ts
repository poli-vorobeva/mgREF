export interface IObserver {
  addListener(name: string, callback: () => any):any
  addOnceListener(name:string, callback:()=>any):any
  removeListener(id:any):void
  dispatch(name:string):void
}
// interface Iobj
interface IListener{
  id:any,
  name:string,
  callback:()=>any
}
class Observer implements IObserver {
  listeners:IListener[];

  constructor() {
    this.listeners = [];
  }

  addListener(name: string, callback: () => any):any {
    const id = {};
   this.listeners.push({ id, name, callback });
    return id;
  }

  addOnceListener(name:string, callback:()=>{}):any {
    const id = {};
    this.listeners.push({
      id,
      name,
      callback: () => {
        callback();
        // this.removeListener(id)
      },
    });
    return id;
  }

  removeListener(id:any):void {
    this.listeners = this.listeners.filter((it) => it.id !== id);
  }

  dispatch(name:string):void {
    this.listeners.filter((it) => it.name == name).forEach((it) => it.callback());
  }
}
export const observer = new Observer();
