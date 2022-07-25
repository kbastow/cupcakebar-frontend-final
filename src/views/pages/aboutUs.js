import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'

class AboutUsView {
  init(){
    document.title = 'About Us'    
    this.render()    
    Utils.pageIntroAnim()
    const timeline = gsap.timeline({ defaults: { duration: 1 } })
    timeline.from('h1', { opacity: 0 }, .2)
      .from('p',{ opacity: 0, y: '-50%', ease: 'bounce', stagger: .5 }, 1)
  }

  render(){
    const template = html`
      <cb-app-header user="${JSON.stringify(Auth.currentUser)}"></cb-app-header>
      <div class="about-us">
      <div class="page-content">        
        <h1>About Us</h1>
        <br>
        <br>
        <br>
        <br>
        <p>Looking to learn more about Cupcake Bar?
        <br><b> More details coming soon!! </b></p>
        
      </div>    
      </div>  
      <cb-app-footer></cb-app-footer>
    `
    render(template, App.rootEl)
  }
}


export default new AboutUsView()