import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import OrderAPI from '../../OrderAPI'
import UserAPI from '../../UserAPI'
import Toast from './../../Toast'

class CartView {
  init(){
    document.title = 'Cart'
    this.userCart = null    
    this.render()    
    Utils.pageIntroAnim()
    this.getCart()
  }

  async getCart() {
    try {
      const currentUser = await UserAPI.getUser(Auth.currentUser._id);
      this.userCart = currentUser.userCart;
      console.log(this.userCart);
      this.render();
    } catch (err) {
      Toast.show(err, "error");
    }
  }

  async newOrderHandler(e){
    e.preventDefault()
    const submitBtn = document.querySelector('.submit-btn')
    submitBtn.setAttribute('loading', '')    
    const formData = e.detail.formData

    try{
      await OrderAPI.newOrder(formData)
      Toast.show('Order completed')
      submitBtn.removeAttribute('loading')

    }catch(err){
      Toast.show(err, 'error')
      submitBtn.removeAttribute('loading')
    }

    // create sl-dialog for completed order
    const dialogEl = document.createElement('sl-dialog')
    // add class name
    dialogEl.className = 'order-dialog'

    // sl-dialog content
    const dialogContent = html`
    <style>
    .wrap {
        display: flex;
        flex-wrap: wrap;
    }
   
    .content {
        margin-left: 2em;
        margin-right: 2em;
        text-align: left;
        padding-bottom: 1em;
    }

    </style>
    
    <div class="wrap">
      <div class="content">
        <h1>Thank you!</h1>
        <p>You're order has been recieved.</p>
        <sl-button type="primary" class="anim-in" @click=${() => gotoRoute('/')}>Return Home</sl-button>         
      </div>
    </div>
    `
    render(dialogContent, dialogEl)

    // append to document.body
    document.body.append(dialogEl)

    // show sl-dialog
    dialogEl.show()

    // on close, delete dialogEl
    dialogEl.addEventListener('sl-after-hide', () => {
        dialogEl.remove()
    })
  }

  render(){
    const template = html`

  <cb-app-header user="${JSON.stringify(Auth.currentUser)}"></cb-app-header>
      <div class="page-content calign">
        <div class="cart">
        <h1>My cart</h1>
        <sl-form class="form-order" @sl-submit=${this.newOrderHandler}>
          ${
            this.userCart == null
              ? html` <sl-spinner></sl-spinner> `
              : html`
                  ${this.userCart.map(
                    (product) => html`
                      <cb-shop
                        class="product-card"
                        id="${product._id}"
                        productName="${product.productName}"
                        price="${product.price}"
                        image="${product.image}"
                      >
                      </cb-shop>
                    `
                  )}
                `}
                <sl-button
              type="primary"
              class="submit-btn"
              submit
              style="width: 100%;"
              >Confirm Order
            </sl-button>
          </sl-form>        
        </div>  
      </div>
      <cb-app-footer></cb-app-footer>      
    `
    render(template, App.rootEl)
  }
}


export default new CartView()