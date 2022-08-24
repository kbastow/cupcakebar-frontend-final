import App from "../../App";
import { html, render } from "lit-html";
import { gotoRoute, anchorRoute } from "../../Router";
import Auth from "../../Auth";
import Utils from "../../Utils";

class HomeView {
  init() {
    document.title = "Cupcake Bar - Home";
    this.render();
    Utils.pageIntroAnim();

    const first = document.querySelector(".slides");
    const slide = () => {
      const before = document.querySelector(".showing");
      if (before) {
        before.classList.remove("showing");
        const next = before.nextElementSibling;
        if (next) {
          next.classList.add("showing");
        } else {
          first.classList.add("showing");
        }
      } else {
        first.classList.add("showing");
      }
    };
    slide();

    setInterval(slide, 4000);
  }

  render() {
    const template = html`
      <cb-app-header user="${JSON.stringify(Auth.currentUser)}"></cb-app-header>
      <div class="page-content">
        <div class="content-box">
        <div class="slider">
          <div class="slides" id="feature-box">
            <img class="feature-img" src="/images/feature-img.png" />
            <div class="feature-txt-box">
              <img class="feature-txt" src="/images/feature-txt.png" />
              <a
                class="shop-now-btn"
                @click=${() => gotoRoute("/shop")}
                >SHOP NOW!
              </a>
            </div>
          </div>
          <div class="slides" id="feature-box-two">
            <div class="feature-txt-box-two">
              <img class="feature-txt-two" src="/images/visit-us-txt.png" />
              <a
                class="shop-now-btn"
                @click=${() => gotoRoute("/aboutUs")}
                >VISIT INSTORE
              </a>
            </div>
            <img class="feature-img-two" src="/images/visit-us.png" />
          </div>
          <div class="slides" id="feature-box">
            <img class="feature-img" src="/images/design-own-img.png" />
            <div class="feature-txt-box">
              <img class="feature-txt-three" src="/images/design-own-txt.png" />
              <a
                class="shop-now-btn"
                @click=${() => gotoRoute("/aboutUs")}
                >VISIT INSTORE
              </a>
            </div>
          </div>
          </div>
        </div>

        <div class="image-box">
          <a href="/shop" @click=${anchorRoute}>
            <img class="home-img1" src="/images/pink-two.png" />
          </a>
          <a href="/shop" @click=${anchorRoute}>
            <img class="home-img2" src="/images/mint-two.png" />
          </a>
          <a href="/shop" @click=${anchorRoute}>
            <img class="home-img3" src="/images/coral-two.png" />
          </a>
          <a href="/shop" @click=${anchorRoute}>
            <img class="home-img4" src="/images/yellow-two.png" />
          </a>
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
          <h1 class="follow-us">Follow us on Instagram</h1>
          <div class="image-box">
            <img class="home-img5" src="/images/social-image-1.jpg" />
            <img class="home-img6" src="/images/social-image-2.jpg" />
            <img class="home-img7" src="/images/social-image-3.jpg" />
            <img class="home-img8" src="/images/social-image-4.jpg" />
          </div>
        </div>
      </div>
      <cb-app-footer></cb-app-footer>
    `;
    render(template, App.rootEl);
  }
}

export default new HomeView();
