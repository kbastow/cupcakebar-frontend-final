import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'

class GuestAboutUsView {
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
          <div class="brandmark-container">
            <img class="about-img" src="/images/feature-img-2.png">
            
          </div>
          <div class="about-us-container">
              <h1>The Cupcake Bar</h1>
              <p class="about-txt">The Cupcake Bar is a small cupcake store in the city of Melbourne. We are passionate about providing 
                all customers with the tastiest of baked goods and pride ourselves on our own specially crafted recipes.
                We stock a range of classic flavours and are always coming up with new and improved flavours to 
                surprise our customers. 
              </p>
              <br>
              <br>
              <br>
              <h1>Contact Us</h1>
              <p class="about-txt">Cupcake Bar, 14 Degraves St,
              <br>
              Melbourne VIC 3000
              <br>
              <br>
              hello@cupcakebar.com
              <br>
              <br>
              0418 293 920
              <br>
              <br>
              Find us on socials
              <br>
              @cupcakebar
              </p>

          </div>        
        </div>   
      </div>

      <cb-app-footer></cb-app-footer>
    `
    render(template, App.rootEl)
  }
}


export default new GuestAboutUsView()