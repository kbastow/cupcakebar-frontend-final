import App from "../../App";
import { html, render } from "lit-html";
import { gotoRoute, anchorRoute } from "../../Router";
import Auth from "../../Auth";
import Utils from "../../Utils";
import ProductAPI from "./../../ProductAPI";
import Toast from "../../Toast";

class ShopView {
  async init() {
    document.title = "Shop";
    this.products = null;
    this.render();
    Utils.pageIntroAnim();
    await this.getProducts();
    
    const timeline = gsap.timeline({ defaults: { duration: 2 } })
    timeline.from('.product-card', { opacity: 0, stagger: .5},'+=0.8')
    
  }

  async filterProducts(field, match) {
    // validate
    if (!field || !match) return;

    // get fresh copy of the products
    this.products = await ProductAPI.getProducts();

    let filteredProducts;

    // gluten free
    if (field == "glutenFree") {
      filteredProducts = this.products.filter(
        (product) => product.glutenFree == true
      );
    }

    // nut free
    if (field == "nutFree") {
      filteredProducts = this.products.filter(
        (product) => product.nutFree == true
      );
    }

    // dairy free
    if (field == "dairyFree") {
      this.filteredProducts = this.products.filter(
        (product) => product.dairyFree == true
      );
    }

    // vegan
    if (field == "vegan") {
      this.filteredProducts = this.products.filter(
        (product) => product.vegan == true
      );
    }

    // render
    this.products = filteredProducts;
    this.render();
  }

  clearFilterBtns() {
    const filterBtns = document.querySelectorAll(".filter-btn");
    filterBtns.forEach((btn) => btn.removeAttribute("type"));
  }

  handleFilterBtn(e) {
    // clear all active filter buttons (type = primary)
    this.clearFilterBtns();

    e.target.setAttribute("type", "primary");
    // extract file and match from the button
    const field = e.target.getAttribute("data-field");
    const match = e.target.getAttribute("data-match");

    // filter products
    this.filterProducts(field, match);
  }

  clearFilters() {
    this.getProducts();
    this.clearFilterBtns();
  }

  async getProducts() {
    try {
      this.products = await ProductAPI.getProducts();
      this.render();
    } catch (err) {
      Toast.show(err, "error");
    }
  }

  render() {
    const template = html`
     <style>
        .filter-menu {
          display: flex;
          align-items: center;
        }

        .filter-menu >div{
          margin-right: 1em;
        }
      </style>
      <cb-app-header user="${JSON.stringify(Auth.currentUser)}"></cb-app-header>
      <div class="page-content shop calign">        
         <div class="filter-menu">
            <div>
              Filters
            </div>
          <div>
              <sl-button class="filter-btn" data-field="glutenFree" data-match="true" @click=${this.handleFilterBtn.bind(
                this
              )}>GLUTEN FREE</sl-button>
              <sl-button class="filter-btn" data-field="nutFree" data-match="true" @click=${this.handleFilterBtn.bind(
                this
              )}>NUT FREE</sl-button>
              <sl-button class="filter-btn" data-field="dairyFree" data-match="true" @click=${this.handleFilterBtn.bind(
                this
              )}>DAIRY FREE</sl-button>
              <sl-button class="filter-btn"5px; data-field="vegan" data-match="true" @click=${this.handleFilterBtn.bind(
                this
              )}>VEGAN</sl-button>
          </div>
             <sl-button class="clear-btn" @click=${this.clearFilters.bind(
               this
             )}>CLEAR</sl-button>
        </div>
        
        <div class="products-grid">
          ${
            this.products == null
              ? html` 
              <div class="loading">
              <img src="../../images/loading-animation.gif"/> </div> `
              : html`
                  ${this.products.map(
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

export default new ShopView();
