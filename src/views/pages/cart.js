import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import OrderAPI from '../../OrderAPI'
import UserAPI from '../../UserAPI'
import Toast from './../../Toast'

class CartView{
  constructor() {
    this.cart = null
    this.total = null
  }

  init(){
    document.title = 'Cart'
    this.cart = null
    this.total = null    
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
      // sum cart total here, and assign to this.total
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

      this.render();
      const myElement = document.querySelector('cb-cart');
      if (myElement !== null ) {
        myElement.addEventListener('deleteItem', (e) => {
          this.getCart()
        });
      }
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
      for (const product in formData.products) {
        await UserAPI.deleteCartProduct(formData.products[product]._id)
      }
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
    <img src="/images/cupcake-box.png" />
      <div class="content">
        <h1>Thank you!</h1>
        <br>
        <p>You're order has been received.</p>
        <p> Feel free to browse more of our site while we pack your delicious cupcakes!</p>
        <p> We hope to see you again soon. </p>
        <br>
        <sl-button type="primary" class="anim-in" @click=${() => gotoRoute('/')}>Return Home</sl-button>         
      </div>
      
    </div>
    `
    render(dialogContent, dialogEl)

    // append to document.body
    document.body.append(dialogEl)

    // show sl-dialog
    dialogEl.show()
    this.getCart()
    // on close, delete dialogEl
    dialogEl.addEventListener('sl-after-hide', () => {
        dialogEl.remove()
    })
  }

  render(){
  
  const template = html`

  <cb-app-header user="${JSON.stringify(Auth.currentUser)}"></cb-app-header>
  <div class="page-content">
    <sl-form class="page-form" @sl-submit=${this.newOrderHandler.bind(this)}>
      
      <div class="cart">   

        <h1>YOUR CART</h1>
    
              ${
                this.cart == null ? html` 
                <div class="loading">
                  <img src="../../images/loading-animation.gif"/> 
                </div>

                `: html`
                ${this.cart.length == 0 
                ? html`<h4 style="margin:5vw 0; padding-left:4vw;"> Your cart is empty!</h4>
                <sl-button style="padding-left:4vw;" class="back-btn" type="primary" @click=${() => gotoRoute('/shop')}>BACK TO SHOP</sl-button>`

                : this.cart.map(
                      (product) => html`
                        
                        <div class="product-column">
                              <cb-cart 
                                class="cart-product"
                                id="${product._id}"
                                productName="${product.productName}"
                                price="${product.price}"
                                image="${product.image}"
                                >
                              <sl-icon-button name="x-circle" label="remove" style="font-size: 0.6rem;">X<sl-icon-button>
                              </cb-cart>
                             
                          </div>                       
                            `
                    )}
                          <div class="order-summary-column">
                            <h2>ORDER SUMMARY</h2>
                              <div class="summary-box">
                                <p>Grand Total: $${this.total}</p>
                                
                                <div class="orderSummary" id="summaryBox"></div>
                                <sl-button type="primary" class="new-order-submit-btn" submit style="width: 100%;">CHECK OUT</sl-button>
                              </div>
                          </div>
              `}
      </div>      
    </sl-form>
  </div>
  <cb-app-footer></cb-app-footer>       
  `
  
  render(template, App.rootEl)
  
  }
}

export default new CartView()