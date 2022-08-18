import App from "../../App";
import { html, render } from "lit-html";
import { gotoRoute, anchorRoute } from "../../Router";
import Auth from "../../Auth";
import Utils from "../../Utils";

class HomeView {
  init() {
    document.title = "Home";
    this.render();
    Utils.pageIntroAnim();

    const first = document.querySelector(".slides");
    const slide = () => {
      const before = document.querySelector(".showing");
      if (before) {
        before.classList.remove("showing");
        const next = before.nextElementSibling;
        if (next) {
          next.classList.add("showing");
        } else {
          first.classList.add("showing");
        }
      } else {
        first.classList.add("showing");
      }
    };
    slide();

    setInterval(slide, 8000);

const galleryContainer = document.querySelector('.gallery-container');
const galleryControlsContainer = document.querySelector('.gallery-controls');
const galleryControls = ['previous', 'add', 'next'];
    const galleryItems = document.querySelectorAll('.gallery-item');

    class Carousel {
  constructor(container, items, controls) {
    this.carouselContainer = container;
    this.carouselControls = controls;
    this.carouselArray = [...items];
  }

  // Update css classes for gallery
  updateGallery() {
    this.carouselArray.forEach(el => {
      el.classList.remove('gallery-item-1');
      el.classList.remove('gallery-item-2');
      el.classList.remove('gallery-item-3');
      el.classList.remove('gallery-item-4');
      el.classList.remove('gallery-item-5');
    });

    this.carouselArray.slice(0, 5).forEach((el, i) => {
      el.classList.add(`gallery-item-${i+1}`);
    });
  }

  // Update the current order of the carouselArray and gallery
  setCurrentState(direction) {

    if (direction.className == 'gallery-controls-previous') {
      this.carouselArray.unshift(this.carouselArray.pop());
    } else {
      this.carouselArray.push(this.carouselArray.shift());
    }
    
    this.updateGallery();
  }

  // Construct the carousel navigation
  // setNav() {
    // galleryContainer.appendChild(document.createElement('ul')).className = 'gallery-nav';

    // this.carouselArray.forEach(item => {
    //   const nav = galleryContainer.lastElementChild;
    //   nav.appendChild(document.createElement('li'));
    // }); 
  // }s

  // Construct the carousel controls
  setControls() {
    this.carouselControls.forEach(control => {
      galleryControlsContainer.appendChild(document.createElement('button')).className = `gallery-controls-${control}`;

      document.querySelector(`.gallery-controls-${control}`).innerText = control;
    });
  }
 
  // Add a click event listener to trigger setCurrentState method to rearrange carousel
  useControls() {
    const triggers = [...galleryControlsContainer.childNodes];

    triggers.forEach(control => {
      control.addEventListener('click', e => {
        e.preventDefault();

        if (control.className == 'gallery-controls-add') {
          const newItem = document.createElement('img');
          const latestItem = this.carouselArray.length;
          const latestIndex = this.carouselArray.findIndex(item => item.getAttribute('data-index') == this.carouselArray.length)+1;

          // Assign the necessary properties for new gallery item
          Object.assign(newItem,{
            className: 'gallery-item',
            src: `http://fakeimg.pl/300/?text=${this.carouselArray.length+1}`
          });
          newItem.setAttribute('data-index', this.carouselArray.length+1);

          // Then add it to the carouselArray and update the gallery
          this.carouselArray.splice(latestIndex, 0, newItem);
          document.querySelector(`[data-index="${latestItem}"]`).after(newItem);
          this.updateGallery();

        } else {
          this.setCurrentState(control);
        }

      });
    });
  }
}

const exampleCarousel = new Carousel(galleryContainer, galleryItems, galleryControls);

exampleCarousel.setControls();
// exampleCarousel.setNav();
exampleCarousel.useControls();
    


    /*const carousel = document.querySelector("[data-target='carousel']");
const card = carousel.querySelector("[data-target='card']");
const leftButton = document.querySelector("[data-action='slideLeft']");
const rightButton = document.querySelector("[data-action='slideRight']");

// Prepare to limit the direction in which the carousel can slide, 
// and to control how much the carousel advances by each time.
// In order to slide the carousel so that only three cards are perfectly visible each time,
// you need to know the carousel width, and the margin placed on a given card in the carousel
const carouselWidth = carousel.offsetWidth;
const cardStyle = card.currentStyle || window.getComputedStyle(card)
const cardMarginRight = Number(cardStyle.marginRight.match(/\d+/g)[0]);

// Count the number of total cards you have
const cardCount = carousel.querySelectorAll("[data-target='card']").length;

// Define an offset property to dynamically update by clicking the button controls
// as well as a maxX property so the carousel knows when to stop at the upper limit
let offset = 0;
const maxX = -((cardCount / 3) * carouselWidth + 
               (cardMarginRight * (cardCount / 3)) - 
               carouselWidth - cardMarginRight);


// Add the click events
leftButton.addEventListener("click", function() {
  if (offset !== 0) {
    offset += carouselWidth + cardMarginRight;
    carousel.style.transform = `translateX(${offset}px)`;
    }
})
  
rightButton.addEventListener("click", function() {
  if (offset !== maxX) {
    offset -= carouselWidth + cardMarginRight;
    carousel.style.transform = `translateX(${offset}px)`;
  }
})*/
  }

  render() {
    const template = html`
      <cb-app-header user="${JSON.stringify(Auth.currentUser)}"></cb-app-header>
      <div class="page-content">
        <div class="slider">
          <div class="slides" id="feature-box">
            <img class="feature-img" src="/images/feature-img.png" />
            <div class="feature-txt-box">
              <img class="feature-txt" src="/images/feature-txt.png" />
              <sl-button
                class="shop-now-btn"
                type="primary"
                @click=${() => gotoRoute("/shop")}
                >SHOP NOW!
              </sl-button>
            </div>
          </div>
          <div class="slides" id="feature-box-two">
            <img class="feature-img" src="/images/coral-two.png" />
            <div class="feature-txt-box">
              <img class="feature-txt" src="/images/feature-txt.png" />
              <sl-button
                class="shop-now-btn"
                type="primary"
                @click=${() => gotoRoute("/shop")}
                >SHOP NOW!
              </sl-button>
            </div>
          </div>
          <div class="slides" id="feature-box-three">
            <img class="feature-img" src="/images/yellow-two.png" />
            <div class="feature-txt-box">
              <img class="feature-txt" src="/images/feature-txt.png" />
              <sl-button
                class="shop-now-btn"
                type="primary"
                @click=${() => gotoRoute("/shop")}
                >SHOP NOW!
              </sl-button>
            </div>
          </div>
        </div>

        <!--<div class="image-box">
          <a href="/shop" @click=${anchorRoute}>
            <img class="home-img1" src="/images/pink-two.png" />
          </a>
          <a href="/shop" @click=${anchorRoute}>
            <img class="home-img2" src="/images/mint-two.png" />
          </a>
          <a href="/shop" @click=${anchorRoute}>
            <img class="home-img3" src="/images/coral-two.png" />
          </a>
          <a href="/shop" @click=${anchorRoute}>
            <img class="home-img4" src="/images/yellow-two.png" />
          </a>
        </div>-->
        <!--<div class="wrapper">
  <ul class="carousel-two" data-target="carousel">
    <li class="card" data-target="card" href="/shop" @click=${anchorRoute}>
      <img class="home-img1" src="/images/pink-two.png" />
    </li>
    <li class="card" data-target="card" href="/shop" @click=${anchorRoute}>
      <img class="home-img2" src="/images/mint-two.png" />
    </li>
    <li class="card" data-target="card" href="/shop" @click=${anchorRoute}>
      <img class="home-img3" src="/images/coral-two.png" />
    </li>
    <li class="card" data-target="card" href="/shop" @click=${anchorRoute}>
       <img class="home-img4" src="/images/yellow-two.png" />
    </li>
    <li class="card" data-target="card"></li>
    <li class="card" data-target="card"></li>
    <li class="card" data-target="card"></li>
    <li class="card" data-target="card"></li>
    <li class="card" data-target="card"></li>
  </ul>
  <div class="button-wrapper">
    <sl-button type="default" size="medium" circle data-action="slideLeft"><sl-icon name="chevron-left"></sl-button>
    <sl-button type="default" size="medium" circle data-action="slideRight"><sl-icon name="chevron-right"></sl-button>
  </div>-->
   <div class="gallery">
    <div class="gallery-container">
      <img class="gallery-item gallery-item-1" src="/images/pink-two.png" href="/shop" @click=${anchorRoute} data-index="1">
      <img class="gallery-item gallery-item-2" src="/images/mint-two.png" href="/shop" @click=${anchorRoute} data-index="2">
      <img class="gallery-item gallery-item-3" src="/images/coral-two.png" href="/shop" @click=${anchorRoute} data-index="3">
      <img class="gallery-item gallery-item-4" src="/images/yellow-two.png" href="/shop" @click=${anchorRoute} data-index="4">
      <img class="gallery-item gallery-item-5" src="/images/baby-blue.jpeg" href="/shop" @click=${anchorRoute} data-index="5">
    </div>
    <div class="gallery-controls"></div>
  </div>
</div>

        <div class="blurb-box">
          <img class="blurb-img" src="/images/blurb-img.png" />
          <div class="blurb-txt-box">
            <a class="blurb-txt"
              >Scrumptious, retro inspired cupcakes, handmade from scratch with
              a whole lotta love using premium quality, locally sourced
              ingredients. All of our cupcakes are freshly baked on site all
              day, every day, untill they're golden and crispy on the outside
              and soft and fluffy on the inside. Topped with your favourite
              frosting and topping!
            </a>
          </div>
        </div>

        <div class="social-media-box calign">
          <h1>Follow us on Instagram</h1>
          <div class="image-box">
            <img class="home-img5" src="/images/feature-img.png" />
            <img class="home-img6" src="/images/yellow.jpeg" />
            <img class="home-img7" src="/images/cupcake-queen.png" />
            <img class="home-img8" src="/images/coral.jpeg" />
          </div>
        </div>
      </div>
      <cb-app-footer></cb-app-footer>
    `;
    render(template, App.rootEl);
  }
}

export default new HomeView();
