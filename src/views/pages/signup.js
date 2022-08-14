import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'

class SignUpView {
  init() {
    console.log("SignUpView.init");
    document.title = "Sign Up";
    this.render();
    Utils.pageIntroAnim();
  }

  signUpSubmitHandler(e) {
    e.preventDefault();
    const submitBtn = document.querySelector(".submit-btn");
    submitBtn.setAttribute("loading", "");
    const formData = e.detail.formData;

    // sign up using Auth
    Auth.signUp(formData, () => {
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
      <div class="sign-in page-centered">
        <div class="signinup-box">
          <img class="signinup-logo" src="/images/brandmark.png" />
          <h3>Sign Up</h3>
          <sl-form class="form-signup" @sl-submit=${this.signUpSubmitHandler}>
            <div class="input-group">
              <sl-input
                name="firstName"
                type="text"
                placeholder="First Name"
                required
              ></sl-input>
            </div>
            <div class="input-group">
              <sl-input
                name="lastName"
                type="text"
                placeholder="Last Name"
                required
              ></sl-input>
            </div>
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
            <div class="input-group">
              <sl-select class="sign-up-level" name="accessLevel" placeholder="I am a ..." required>
                <sl-menu-item value="1">Admin</sl-menu-item>
                <sl-menu-item value="2">Customer</sl-menu-item>
              </sl-select>
            </div>
            <sl-button
              type="primary"
              class="submit-btn"
              submit
              style="width: 100%;"
              >Sign Up</sl-button
            >
          </sl-form>
          <p>
            Have an account? <a href="/signin" @click=${anchorRoute}>Sign In</a>
          </p>
        </div>
      </div>
    `;
    render(template, App.rootEl);
  }
}

export default new SignUpView();