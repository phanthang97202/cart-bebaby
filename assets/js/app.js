import { productList } from "./productList.js";
const menu__active = document.getElementById("menu__active");
const modal__cover = document.querySelector(".modal__cover");
const closeIcon = document.querySelector(".menu__cover--close ion-icon");
const productsItem = document.querySelector(".products__item");
const productsContainer = document.querySelector(".products__container");

// console.log(menu__active, modal__cover, closeIcon);

// <button id="menu__active">Add</button>;

closeIcon.addEventListener("click", () => {
  modal__cover.style.display = "none";
});
menu__active.addEventListener("click", function (e) {
  modal__cover.style.display = "block";
});
modal__cover.addEventListener("click", function (e) {
  //   console.log(e.target);
  if (e.target === modal__cover) {
    modal__cover.style.display = "none";
  }
});

// bắt sự kiện cuộng trang thanh menu
var container = document.querySelector(".container");
var headerMenu = document.querySelector(".header__menu");
const introduce = document.querySelector(".introduce");
// console.log(container, headerMenu, introduce);

// setTimeout(,1000)

let offSetTopHeaderMenu = headerMenu.offsetTop;

const hanlderScroll = function () {
  // console.log(offSetTopHeaderMenu)
  // console.log("window.pageYOffset", window.pageYOffset);
  // console.log("headerMenu.offsetTop", headerMenu.offsetTop);
  // console.log([hanlderScroll]);

  if (Math.ceil(window.pageYOffset) >= offSetTopHeaderMenu) {
    container.classList.add("activeScroll");
    // introduce.style.display = "none";
  } else {
    container.classList.remove("activeScroll");
    // introduce.style.display = "block";
  }

  // console.log(
  //   "container.getBoundingClientRect().top",
  //   container.getBoundingClientRect().top
  // );

  // headerMenu.getBoundingClientRect().top !== 0
  //   ? container.classList.add("activeScroll")
  //   : container.classList.remove("activeScroll");

  // if(container) {
  //   if (Math.ceil(window.pageYOffset) >= 200) {
  //     container.classList.add("activeScroll");
  //   } else {
  //     container.classList.remove("activeScroll");
  //   }
  // }
};

const header = document.querySelector(".header");

window.addEventListener("scroll", hanlderScroll);
// window.onscroll = hanlderScroll

//
// window.addEventListener("scroll", () => {
//   console.log("scroll", Math.ceil(window.pageYOffset));
// });
window.addEventListener("resize", function (e) {
  let widthWindow = window.innerWidth;

  if (widthWindow > 1200) {
    window.addEventListener("scroll", hanlderScroll);
  } else {
    window.removeEventListener("scroll", hanlderScroll);
  }
});

console.log("productList", productList);
productList[0].colors.map((value) => {
  // console.log(`<p>${value}</p>`);
});
const viewAllProducts = productList.map((product) => {
  return `
    <div data-product=${product.id()} class="products__item">
      <a href="./detail.html?id=${product.id()}">
          <div class="products__item--view">
              ${product.sale !== null ? `<p>ON SALE</p>` : ``}
              <img src=${product.image} alt="">
              <div class="products__item--options">
                  <ion-icon name="link-outline"></ion-icon>
                  <ion-icon name="heart-outline"></ion-icon>
                  <ion-icon name="expand-outline"></ion-icon>
              </div>
          </div>

          <div class="products__item--name">
              <p>${product.name}</p>
              <ul class="products__item--click">
                  ${product.colors
                    .map((color) => {
                      return `<li class=${color}></li>`;
                    })
                    .join("")}
              </ul>
              <div class="products__item--price">
                ${
                  product.sale !== null
                    ? `<del>$${product.price.toFixed(
                        2
                      )}</del><span>$${product.sale.toFixed(2)}</span>`
                    : `<span>$${product.price.toFixed(2)}</span>`
                }
              </div>
          </div>
      </a>
  </div>
  `;
});
productsContainer.innerHTML = viewAllProducts.join("");
