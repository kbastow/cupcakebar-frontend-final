import App from "../../App";
import { html, render } from "lit-html";
import { gotoRoute, anchorRoute } from "../../Router";
import Auth from "../../Auth";
import Utils from "../../Utils";
import ProductAPI from "../../ProductAPI";
import UserAPI from "../../UserAPI";
import Toast from "../../Toast";

class ProductView {
  async init() {
    document.title = "Product";
    this.products = null;
    this.render();
    Utils.pageIntroAnim();
    await this.getProduct();

    const timeline = gsap.timeline({ defaults: { duration: 1 } })
    timeline.from('.product-image', { opacity: 0, scale: 2},1)
            .from('.about-product', { opacity: 0, x: '50%'},'+=0.2')
    
  }

  async getProduct() {
    try {
      const productId = Utils.getParams().productId;
      this.product = await ProductAPI.getProduct(productId);
      this.render();
    } catch (err) {
      Toast.show(err, "error");
    }
  }

  async addToCartHandler() {
    try {
      await UserAPI.addToCart(this.product._id);
      Toast.show("Product added to cart");
    } catch (err) {
      Toast.show(err, "error");
    }
  }

  render() {
    const template = html`
      <cb-app-header user="${JSON.stringify(Auth.currentUser)}"></cb-app-header>

      <div class="page-content">
        <div class="productInfo calign">

          ${this.product == null ? html` 
          <!-- Loading -->
          <div class="loading">
          <img src="../../images/loading-animation.gif"/> </div>
           ` : html`
           
           <div class="product-image">
                    <img class="product-img" src="${App.apiBase}/images/${this.product.image}" alt="${this.product.productName}" />
            </div>

            <div class="about-product">
                    <h1>${this.product.productName}</h1>
                    <h2 id="price">Box of a dozen - $${this.product.price}</h2>
                    <br>
                    <p id="description">${this.product.description}</p>
                    <p id="ingredientsHeading"><b>Ingredients</b></p>
                    <p id="ingredients">${this.product.ingredients}</p>
                    <br>
                    <sl-button class="add-cart-btn" type="primary" @click=${this.addToCartHandler.bind(this)}>ADD TO CART!</sl-button>
                    <sl-button class="back-btn" type="primary" @click=${() => gotoRoute('/shop')}>BACK TO SHOP</sl-button>
                    </div>
              `}
        </div>
      </div>
      <cb-app-footer></cb-app-footer>
    `;
    
    render(template, App.rootEl);
  }
}

export default new ProductView();