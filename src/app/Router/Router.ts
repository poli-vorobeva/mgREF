import {app} from "../../index";

function listen(e: Event){
  console.log('EE')
  const el= <HTMLElement>e.currentTarget
  location.hash=el.classList[1]
  app.init(location.hash)
 // rout.unsubscribe()
}

class Router{
  currentHash:string
  arr: Element[]
  constructor(){
    this.currentHash ='info'
    this.arr=[]
  }
  setListeners(parent:HTMLElement) {
    const navLinks = parent.querySelectorAll('.nav__item')
    navLinks.forEach(el => this.arr.push(<HTMLElement>el))
    this.arr.push(<HTMLElement>parent.querySelector('.button__game'))
    this.arr.push(<HTMLElement>parent.querySelector('.button__register'))
  }
  setHash(val:string){
    location.hash=val
    this.currentHash=val
    this.router()
    //console.log(location.hash)
   // app.init()
  }
  get hash(){
    return location.hash
  }
  // unsubscribe(){
  //   this.arr.forEach(it=>{
  //     it?.removeEventListener('click',listen,false)
  //   })
  // }
  subscribe(){
    this.arr.forEach(it=>{
       it?.addEventListener('click',listen,false)

    })
   // this.unsubscribe()

  }
  router(){
    console.log('router',location.hash)

  }

}

export const rout= new Router()

rout.subscribe()
