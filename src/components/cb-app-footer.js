import { LitElement, html, css } from "@polymer/lit-element";
import { anchorRoute, gotoRoute } from "./../Router";
import Auth from "./../Auth";
// import App from "../App";

customElements.define(
  "cb-app-footer",
  class AppFooter extends LitElement {
    constructor() {
      super();
    }

    static get properties() {
        return {
          title: {
            type: String,
          },
          user: {
            type: Object,
          },
        };
      }

    firstUpdated() {
        super.firstUpdated();
        this.navActiveLinks();
      }
  
      navActiveLinks() {
        const currentPath = window.location.pathname;
        const navLinks = this.shadowRoot.querySelectorAll(
          ".app-footer-nav a"
        );
        navLinks.forEach((navLink) => {
          if (navLink.href.slice(-1) == "#") return;
          if (navLink.pathname === currentPath) {
            navLink.classList.add("active");
          }
        });
      }

    render() {
      return html`
        <style>
          * {
            box-sizing: border-box;
          }

          .footer-container {
            position: absolute; 
            left: 0 ; right: 0; bottom: 0;
            width: 100%;
            height: max-content;
            background: var(--sl-color-primary-50);
            margin-top: 10vw;
          }

          .app-footer {
            background: var(--sl-color-primary-50);
            display: flex;
            width: 100%;
            height: var(--app-header-height);
            color: var(--app-header-txt-color);
            align-items: center;
          }
          

          img {
            width: 15vw;
            padding: 0 1.5vw;
            margin: 0 2 0 2vw;
          }

          .app-footer-nav {
            display: flex;
            align-items: center;
            margin-left: 15vw;
          }

          .app-footer-socials {
            display: inline-block;
          }

          .app-footer-nav a {
            display: flex;
            padding: 1vw;
            margin: 0 2.5vw;
            font-size: 1.1vw;
            width: max-content;
            text-decoration: none;
            color: var(--brand-color);
            align-items: center;
            
          }

          sl-icon-button {
            display: none;
          }

          .app-logo-footer {
            display: block;
          }

          img.app-social-icon {
            width: 22%;
            float: right;
            margin: 0;
          }

          .footer-disclaimer {
            text-align: center;
            font-size: .9vw;
            padding-bottom: 1vw;
          }

          .acknowledge-txt-box {
            text-align: center;
            /* max-width: 80%; */
            font-size: 1vw;
            padding-bottom: 1vw;
          }

          a:hover{
            color: white;
          }

          /* RESPONSIVE - TABLET ------------------- */
          @media all and (max-width: 768px) {

            .app-footer-nav a {
              display: flex;
              padding: .4vw;
              margin: 0 2vw;
              font-size: 1.5vw;
              width: max-content;
              text-decoration: none;
              color: var(--brand-color);
              align-items: center;
              
            }

            .footer-disclaimer {
              text-align: center;
              font-size: 1vw;
              padding-bottom: 1vw;
            }

            .acknowledge-txt-box {
              text-align: center;
              font-size: 10px;
              padding-bottom: 1vw;
              margin-left: 10vw;
              margin-right: 10vw;
            }

          }

          /* RESPONSIVE - MOBILE ------------------- */
          @media all and (max-width: 375px) {

            .app-footer-nav a {
              display: flex;
              padding: .2vw;
              margin: 0 1.5vw;
              font-size: 1.8vw;
              width: max-content;
              text-decoration: none;
              color: var(--brand-color);
              align-items: center;
              
            }

            .footer-disclaimer {
              text-align: center;
              font-size: 1.2vw;
              padding-bottom: 1vw;
            }

            .acknowledge-txt-box {
              text-align: center;
              font-size: 5px;
              padding-bottom: 1vw;
              margin-left: 10vw;
              margin-right: 10vw;
            }

          }


        </style>
        <footer class="footer-container">
            <div class="app-footer">

            <div class="app-footer-logo">
                <a href="/" @click="${anchorRoute}"><img class="app-logo-footer" src="/images/brandmark.png" /></a>
            </div>
            <nav class="app-footer-nav">
                <a href="/aboutUs" @click="${anchorRoute}">Visit us instore</a>
                <a href="/shop" @click="${anchorRoute}">Order online</a>
                <a href="/aboutUs" @click="${anchorRoute}">Contact us</a>
            </nav>
            <nav class="app-footer-socials">
                <a href="https://www.facebook.com/" target="_blank"><img class="app-social-icon" src="/images/facebook.png" /></a>
                <a href="https://www.twitter.com/" target="_blank"><img class="app-social-icon" src="/images/twitter.png" /></a>
                <a href="https://www.instagram.com/" target="_blank"><img class="app-social-icon" src="/images/instagram.png" /></a>
            </nav>

            </div>
            <div class="acknowledge-txt-box"> 
              <p>
              Cupcake Bar acknowledges that we live and work on lands belonging
              to the Kulin Nation. We pay our respects to Elders, both past,<br>
              present and emerging of the Kulin Nation and any lands to which we
              may travel. This always was and always will be Aboriginal land.
            </p>
            </div>
            <div class="footer-disclaimer">
                <p>Please note this website has been created for educational purposes<br>only by students of Curtin University.</p>
            </div>
        </footer>
      `;
    }
  }
);
