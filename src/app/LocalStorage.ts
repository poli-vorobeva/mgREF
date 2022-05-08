// export interface ILocalStorage {
//   setValues(values:{ [key:string]:string|null }):void
// }
// export class LocalStorage implements ILocalStorage {
//   constructor() {
//
//   }
//
//   setValues(values:{ [key:string]:string|null }):void {
//     this.clearUserData()
//     const {
//       email, lastName, firstName, photo,
//     } = values;
//     if(firstName && lastName && email){
//       window.localStorage.firstName = firstName ;
//       window.localStorage.lastName = lastName;
//       window.localStorage.email = email;
//       photo && (window.localStorage.photo = photo);
//     }
//   }
//   clearUserData(){
//     window.localStorage.removeItem('firstName')
//     window.localStorage.removeItem('lastName')
//     window.localStorage.removeItem('email')
//     window.localStorage.removeItem('photo')
//
//   }
//   getLocalData(){
//     return {
//       firstName:window.localStorage.getItem('firstName'),
//       lastName:window.localStorage.getItem('lastName'),
//       email:window.localStorage.getItem('email'),
//       photo:window.localStorage.getItem('photo')
//     }
//   }
//   setScoreData(score:number):{userName:string,score:number}[]{
//     const data=JSON.parse(window.localStorage.getItem('score'))
//     const {firstName,lastName,email}=this.getLocalData()
//     if(firstName && lastName && email){
//       const newGameData={userName:firstName,score}
//       const newData=data ? [...data,newGameData] : [newGameData]
//       window.localStorage.setItem('score',JSON.stringify(newData))
//     }
//     return JSON.parse(window.localStorage.getItem('score'))
//   }
// }
