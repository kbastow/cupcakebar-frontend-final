import App from "../../App";
import { html, render } from "lit-html";
import { gotoRoute, anchorRoute } from "../../Router";
import Auth from "../../Auth";
import Utils from "../../Utils";

class HomeView {
  init() {
    document.title = "Home";
    this.render();
    Utils.pageIntroAnim();
  }

  render() {
    const template = html`
      <cb-app-header
        user="${JSON.stringify(Auth.currentUser)}"
      ></cb-app-header>
      <div class="page-content">
        <div class="feature-box">
          <img class="feature-img" src="/images/feature-img.png" />
          <div class="feature-txt-box">
            <img class="feature-txt" src="/images/feature-txt.png" />
            <sl-button class="shop-now-btn" type="primary" @click=${() => gotoRoute('/shop')}>SHOP NOW!
            </sl-button>
          </div>
        </div>
        <div class="image-box">
          <img class="home-img1" src="/images/pink-two.png" />
          <img class="home-img2" src="/images/mint-two.png" />
          <img class="home-img3" src="/images/coral-two.png" />
          <img class="home-img4" src="/images/yellow-two.png" />
        </div>
        <div class="blurb-box">
          <img class="blurb-img" src="/images/blurb-img.png" />
          <div class="blurb-txt-box">
            <a class="blurb-txt"
              >Scrumptious, retro inspired cupcakes, handmade from scratch with
              a whole lotta love using premium quality, locally sourced
              ingredients. All of our cupcakes are freshly baked on site all
              day, every day, untill they're golden and crispy on the outside
              and soft and fluffy on the inside. Topped with your favourite
              frosting and topping!
            </a>
          </div>
        </div>

       <div class="social-media-box calign">
          <h1>Follow us on Instagram</h1>
          <div class="image-box">
            <img class="home-img5" src="/images/feature-img.png" />
            <img class="home-img6" src="/images/yellow.jpeg" />
            <img class="home-img7" src="/images/cupcake-queen.png" />
            <img class="home-img8" src="/images/coral.jpeg" />
          </div>
       
        </div>
      </div>
      <cb-app-footer></cb-app-footer>
    `;
    render(template, App.rootEl);
  }
}

export default new HomeView();
