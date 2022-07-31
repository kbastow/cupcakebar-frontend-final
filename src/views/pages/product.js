import App from "../../App";
import { html, render } from "lit-html";
import { gotoRoute, anchorRoute } from "../../Router";
import Auth from "../../Auth";
import Utils from "../../Utils";
import ProductAPI from "../../ProductAPI";
import Toast from "../../Toast";

class ProductView {
  async init() {
    document.title = "Product";
    this.products = null;
    this.render();
    Utils.pageIntroAnim();
    await this.getProduct();
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

  render() {
    const template = html`
      <cb-app-header user="${JSON.stringify(Auth.currentUser)}"></cb-app-header>

      <div class="page-content">
        <div class="productInfo calign">

          ${this.product == null ? html` 
          <!-- Loading -->
          <img src="../../images/loading-animation.gif"/>
           ` : html`
                    <img src="${App.apiBase}/images/${this.product.image}" alt="${this.product.productName}" />
                    <h1>${this.product.productName}</h1>
                    <p id="price">Box of a dozen - "${this.product.price}"</p>
                    <p id="description">"${this.product.description}"</p>
                    <p id="ingredientsHeading">Ingredients</p>
                    <p id="ingredients">"${this.product.ingredients}"</p>
                    <!-- <p>"${this.product.glutenFree}"</p>
                    <p>"${this.product.nutFree}"</p>
                    <p>"${this.product.dairyFree}"</p>
                    <p>"${this.product.vegan}"</p> -->
                    <button id="addCart">ADD TO CART!</button>
              `}
        </div>
      </div>
      <cb-app-footer></cb-app-footer>
    `;
    
    render(template, App.rootEl);
  }
}

export default new ProductView();
