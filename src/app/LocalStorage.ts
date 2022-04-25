export interface ILocalStorage {
  setValues(values:{ [key:string]:string|null }):void
}
export class LocalStorage implements ILocalStorage {
  constructor() {

  }

  setValues(values:{ [key:string]:string|null }):void {
    window.localStorage.clear();
    const {
      email, lastName, firstName, photo,
    } = values;
    window.localStorage.firstName = firstName;
    window.localStorage.lastName = lastName;
    window.localStorage.email = email;
    window.localStorage.photo = photo;
  }
}
