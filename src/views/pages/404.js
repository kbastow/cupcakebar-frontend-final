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
      <div class="error">
      <img src="/images/Cupcake-30.jpg" />  
      <div class="page-content">  
         <div class="text"> 
        <h1>Ooops!</h1>
        <p>We can't seem to find the page you are looking for
        <br>
        404 ERROR
        <br>
         <a href="/" @click="${anchorRoute}">Back to home</a>.</p>
         </div>
        </div>      
      </div>
        <cb-app-footer></cb-app-footer>
      
    `
    render(template, App.rootEl)
  }
}


export default new FourOFourView()