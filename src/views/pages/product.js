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
    this.product = null;
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
      <h1>Coming Soon</h1>
        <div class="productInfo calign">
        <br>
        <br>
        <br>
        <br>
        <p>Looking to purchase these cupcakes?
        <br><b> Shop coming soon!! </b></p>
          <!-- ${this.product == null
            ? html` <img src="../../images/loading...(2).gif" /> `
            : html`
                ${this.product.map(
                  (product) => html`
                    <img src="${product.image}" alt="${product.productName}" />
                    <h1>${product.productName}</h1>
                    <p id="price">Box of a dozen - "${product.price}"</p>
                    <p id="description">"${product.description}"</p>
                    <p id="ingredientsHeading">Ingredients</p>
                    <p id="ingredients">"${product.ingredients}"</p>
                    <p>"${product.glutenFree}"</p>
                    <p>"${product.nutFree}"</p>
                    <p>"${product.dairyFree}"</p>
                    <p>"${product.vegan}"</p>
                  `
                )}
              `}
          <button id="addCart">ADD TO CART!</button> -->
        </div>
      </div>
      <cb-app-footer></cb-app-footer>
    `;
    
    render(template, App.rootEl);
  }
}

export default new ProductView();
