import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'

class SignInView {
  init() {
    console.log("SignInView.init");
    document.title = "Sign In";
    this.render();
    Utils.pageIntroAnim();
  }

  signInSubmitHandler(e) {
    e.preventDefault();
    const formData = e.detail.formData;
    const submitBtn = document.querySelector(".submit-btn");
    submitBtn.setAttribute("loading", "");

    // sign in using Auth
    Auth.signIn(formData, () => {
      submitBtn.removeAttribute("loading");
    });
  }

  render() {
    const template = html`
    <style>
      body {
        background: var(--body-bg);
      }
    </style>
      <div class="sign-in page-centered" >
        <div class="signinup-box">
          <a href="/guestHome" @click="${anchorRoute}" title="Cupcake Bar - Home"><img class="signinup-logo" src="/images/brandmark.png"/></a>
          <sl-form
            class="form-signup dark-theme"
            @sl-submit=${this.signInSubmitHandler}
          >
            <div class="input-group">
              <sl-input
                name="email"
                type="email"
                placeholder="Email"
                required
              ></sl-input>
            </div>
            <div class="input-group">
              <sl-input
                name="password"
                type="password"
                placeholder="Password"
                required
                toggle-password
              ></sl-input>
            </div>
             <p>No Account? <a href="/signup" @click=${anchorRoute}>Sign Up</a></p>
            <sl-button
              class="submit-btn"
              type="primary"
              submit
              style="width: 100%;"
              >LOGIN</sl-button
            >
          </sl-form>
        </div>
      </div>
    `;
    render(template, App.rootEl);
  }
}

export default new SignInView();