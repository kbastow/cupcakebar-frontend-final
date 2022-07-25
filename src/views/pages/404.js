import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'

class FourOFourView {
  init(){
    document.title = '404'    
    this.render()    
    Utils.pageIntroAnim()
  }

  render(){
    const template = html`
      <cb-app-header user="${JSON.stringify(Auth.currentUser)}"></cb-app-header>
      <div class="page-content">        
        <h1>Ooops!</h1>
        <p>This page doesn't exist. Take me <a href="/" @click="${anchorRoute}">home</a>.</p>
        <cb-app-footer></cb-app-footer>
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new FourOFourView()