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
    this.cart = null    
    this.render()  
    this.getCart()  
    Utils.pageIntroAnim()
    const timeline = gsap.timeline({ defaults: { duration: 1 } })
    timeline.from('h1', { opacity:0, y:'-50%', ease: 'bounce' },1)
            .from('.products-grid', { opacity: 0, x:'-20%'},'+=0.5')
    
  }

  async getCart() {
    try {
      const currentUser = await UserAPI.getUser(Auth.currentUser._id);
      this.cart = currentUser.userCart;
      console.log(this.cart);
      this.render();
    } catch (err) {
      Toast.show(err, "error");
    }
  }

  async newOrderHandler(e){
    e.preventDefault()
    const submitBtn = document.querySelector('.new-order-submit-btn')
    submitBtn.setAttribute('loading', '')
    const currentUser = await UserAPI.getUser(Auth.currentUser._id);
    const cart = currentUser.userCart;
    const orderTotal = cart.reduce((accumulator, object) => {
      return accumulator + object.price;
    }, 0);
    const formData = {
      id: currentUser._id,
      products: cart,
      total: orderTotal,
      status: false,
    }
    console.log(formData)

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
  <div class="page-content">
      <sl-form class="page-form" @sl-submit=${this.newOrderHandler}>
        <div class="cart"> 
          <div class="products-grid">
            <h1>My cart</h1>
              ${
                this.cart == null ? html` 
                <div class="loading">
                <img src="../../images/loading-animation.gif"/> </div>
                `: html`
                ${this.cart.length == 0 ?
                  html`<h2> Your cart is empty!</h2>
                  <sl-button class="back-btn" type="primary" @click=${() => gotoRoute('/shop')}>BACK TO SHOP</sl-button>`
                    
                    : this.cart.map(
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
              <sl-button type="primary" class="new-order-submit-btn" submit style="width: 100%;">Confirm Order</sl-button>
            </div>
          </div>     
        </sl-form>
      </div>
    <cb-app-footer></cb-app-footer>       
    `
    render(template, App.rootEl)
  }
}


export default new CartView()