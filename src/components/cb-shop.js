import { LitElement, html, css } from "@polymer/lit-element";
import { render } from "lit-html";
import { anchorRoute, gotoRoute } from "../Router";
import Auth from "../Auth";
import App from "../App";
import UserAPI from "../UserAPI";
import Toast from "../Toast";

customElements.define(
  "cb-shop",
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

    async addFavHandler() {
      try {
        await UserAPI.addSavedProducts(this.id);
        Toast.show("Product added to favourites");
      } catch (err) {
        Toast.show(err, "error");
      }
    }

    render() {
      return html`
      <style>
        .shop-btn::part(base) {
          border-radius: 50px;
          width: 100px;
          border: 3px solid var(--brand-color);
          font-size: 12px;
          color: var(--brand-color);
        }

        .shop-btn::part(base):hover {
          background-color: #e16a2f;
          color: #f5dbdf;
        }

        .name {
          text-transform: uppercase;
        }

        .product-card {
          text-align: center;
        }

        .heart::part(base) {
          color: var(--brand-color);
        }

      </style>
        <sl-card class="product-card">
          <div class="img-container">
          <img slot="image" src="${App.apiBase}/images/${this.image}" />
          <sl-icon-button 
            class="heart"
            name="heart-fill"
            label="Add to Favourites"
            @click=${this.addFavHandler.bind(this)}
          ></sl-icon-button>
          </div>
          <h3 class="name">${this.productName}</h3>
          <p>Box of a dozen - $${this.price}</p>
          <p>${this.description}</p>
          <sl-button class="shop-btn" @click=${() => gotoRoute(`/product?productId=${this.id}`)}>SHOP NOW!</sl-button>
        </sl-card>
      `;
    }
  }
);
