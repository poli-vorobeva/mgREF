import {__} from "../HelperUtil/HelperUtil";
import './Score.scss'

export class Score{
  scoreData:object []

  constructor(){
    this.scoreData=[
      {
        name:'Jhon',
        email:"jhon@ngail.com",
        score:'430',
        time:'01:04:00',
        photo:''
      },
      {
        name:'Mary',
        email:"mary@ngail.com",
        score:250,
        time:'00:03:00',
        photo:''
      },
      {
        name:'Bill',
        email:"bill@ngail.com",
        score:50,
        time:'02:00:03',
        photo:''
      }
      ]
  }
  drawScoreContent(){
    const div= __.create('section','score__content')
    this.scoreData.forEach(man=>{
      const e=JSON.parse(JSON.stringify(man))
      console.log(e.name)
      const avatar=__.create('div','score__avatar').text(e.photo).end()
      const name=__.create('h4','score__name').text(e.name).end()
      const email=__.create('p','score__email').text(e.email).end()
      const divW=__.create('div','score__subWrapper').append(name).append(email).end()
      const score=__.create('div','score__score').text(e.score).end()
      const divM= __.create('div','score__item').append(avatar).append(divW).append(score).end()
      div.append(divM)
    })
    return div.end()
  }
  init(){
    const h3= __.create('h3','score__h3').text('Score').end()
    const scoreTable = this.drawScoreContent()
    const wrapper=__.create('div','score__wrapper').append(h3).append(scoreTable).end()
    return wrapper
  }
}
