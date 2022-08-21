import { LitElement, html, css } from "@polymer/lit-element";
import { render } from "lit-html";
import { anchorRoute, gotoRoute } from "../Router";
import Auth from "../Auth";
import App from "../App";
import UserAPI from "../UserAPI";
import Toast from "../Toast";

customElements.define(
  "cb-cart",
  class Shop extends LitElement {
    constructor() {
      super();
    }

    static get properties() {
      return {
        id: {
          type: String,
        },
        productName: {
          type: String,
        },
        image: {
          type: String,
        },
        description: {
          type: String,
        },
        ingredients: {
          type: String,
        },
        price: {
          type: String,
        },
        glutenFree: {
          type: Boolean,
        },
        nutFree: {
          type: Boolean,
        },
        dairyFree: {
          type: Boolean,
        },
        vegan: {
          type: Boolean,
        },
      };
    }

    firstUpdated() {
      super.firstUpdated();
    }

    async deleteCartHandler() {
      try {
        await UserAPI.deleteCartProduct(this.id);
        Toast.show("Product deleted from Cart");
        let deleteItem = new Event('deleteItem');
        this.dispatchEvent(deleteItem);
      } catch (err) {
        Toast.show(err, "error");
      }
    }

    render() {
      return html`
        <style>
          .qty-btn::part(base) {
            border-radius: 50px;
            width: 100px;
            border: 3px solid var(--brand-color);
            font-size: 12px;
            color: var(--brand-color);
            margin-top: 2vw;
          }

          .qty-btn::part(base):hover {
            background-color: #e16a2f;
            color: #f5dbdf;
          }

          .product-card {
            text-align: center;
            min-width: 30%;
            margin: 1.5vw;
          }

          .product-card::part(base) {
            border: none;
            box-shadow: none;
          }

          .delete::part(base) {
            color: var(--brand-color);
          }

          .delete::part(base):hover {
            background: var(--sl-color-primary-50);
          }

          .img-container {
            display: inline-block;
            margin: 0 auto;
            max-width: 200px;
            margin-bottom: 0;
            padding: 0;
            align-items: center;
          }

          .shop-image {
            max-width: 100%;
            margin: 0 auto;
          }

          .details-container {
            display: inline-block;
            vertical-align: top;
            text-align: left;
            margin-left: 1vw;
            margin-top: 5vw;
          }

          .name {
          text-transform: uppercase;
          margin: 0;
          padding: 0;
          }

          .price {
            margin: 0;
          }
        
          .delete {
            position: absolute;
            top: 8%;
            left: 5%;
            margin: 0 auto;
          }
        </style>
        <sl-card class="product-card">
          <div class="img-container">
            <img
              class="shop-image"
              slot="image"
              src="${App.apiBase}/images/${this.image}"
            />
            <sl-icon-button
              class="delete"
              name="x"
              label="Delete from Favourites"
              style="font-size: 1.9rem"
              ;
              @click=${this.deleteCartHandler.bind(this)}
            ></sl-icon-button>
          </div>
          <div class="details-container">
            <h3 class="name">${this.productName}</h3>
            <p class="price">Box of a dozen - $${this.price}</p>
          
          <sl-button
            class="qty-btn"
            
            > 1 </sl-button>
          </div>
        </sl-card>
      `;
    }
  }
);