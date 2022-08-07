import App from '../../App'
import { html, render } from 'lit-html'
import { gotoRoute, anchorRoute } from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import Toast from '../../Toast'
import UserAPI from '../../UserAPI'


class FavouriteProductsView {
  init() {
    document.title = 'Favourite Cupcakes'
    this.favProducts = null;
    this.render()
    this.getFavProducts()
    Utils.pageIntroAnim()
    const timeline = gsap.timeline({ defaults: { duration: 1 } })
    timeline.from('h1', { opacity:0, y:'-50%', ease: 'bounce' },1)
            .from('.products-grid', { opacity: 0, x:'-20%'},'+=0.5')
    
  }

   async getFavProducts() {
    try {
      const currentUser = await UserAPI.getUser(Auth.currentUser._id);
      this.favProducts = currentUser.savedProducts;
      console.log(this.favProducts);
      this.render();
    } catch (err) {
      Toast.show(err, "error");
    }
  }

  render() {
    const template = html`
      <cb-app-header
        user="${JSON.stringify(Auth.currentUser)}"
      ></cb-app-header>
      <div class="favourites">
      <div class="page-content">
      <h1>Your favourite cupcakes!</h1>
       <div class="products-grid">
          ${
            this.favProducts == null
              ? html` 
              <div class="loading">
              <img src="../../images/loading-animation.gif"/> </div> `
              : html`
                  ${this.favProducts.map(
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

        </div>
      </div>
      </div>
      <cb-app-footer></cb-app-footer>
    `;
    render(template, App.rootEl);
  }
}


export default new FavouriteProductsView()