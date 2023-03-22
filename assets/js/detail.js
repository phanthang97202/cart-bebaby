import { productList } from "./productList.js";
// import { v4 as uuidv4 } from "uuid";
// CART
const yourcart__container = document.querySelector(".yourcart__container");
const openCart = document.getElementById("openCart");
const closeCart = document.getElementById("closeCart");

yourcart__container.addEventListener("click", (e) => {
  if (e.target === yourcart__container) {
    console.log("yourcart__container", e.target);
    yourcart__container.classList.add("activeCart");
  }
});
openCart.addEventListener("click", (e) => {
  yourcart__container.classList.remove("activeCart");
});
closeCart.addEventListener("click", (e) => {
  yourcart__container.classList.add("activeCart");
});

const detailContainerDescTitle = document.querySelector(
  ".detail__container--desc-title"
);
const detailContainer = document.querySelector(".detail__container");

const queryParams = new URLSearchParams(window.location.search);
const productId = queryParams.get("id");
// console.log(productId);

const detailProduct = productList.filter(
  (product) => product.id() === productId
);
// console.log(detailProduct);
// lấy ra chi tiết sản phẩm
const viewDetailProduct = detailProduct.map((content) => {
  return `
        <div data-products=${content.id()} class="detail__container--desc">
            <h1 class="detail__container--desc-title">${content.name}</h1>
            <p class="detail__container--desc-context">
               ${content.shortDescription}
            </p>
            <ul class="detail__container--desc-material">
                ${content.listDescription
                  .map((item) => {
                    return `<li>${item}</li>`;
                  })
                  .join("")}
                
            </ul>
            <p class="detail__container--desc-size">
                <i class="fa-sharp fa-solid fa-ruler-combined"></i>
                Sizes chart
            </p>
            <p class="detail__container--desc-prices">
                  ${
                    content.sale !== null
                      ? `<del>$${content.price.toFixed(
                          2
                        )}</del>$${content.sale.toFixed(2)}`
                      : `$${content.price.toFixed(2)}`
                  }
            </p>
            <div class="detail__container--desc-height">
                <p>Height</p>
                <div>
                    ${content.height
                      .map((value) => {
                        return `<button class="" data-height=${value}>${value}</button>`;
                      })
                      .join(" ")}
                </div>
            </div>
            <div class="detail__container--desc-age">
                <p>Age</p>
                <select aria-label=".form-select-lg example">
                    <option selected>Choose an option</option>
                    ${content.age.map((value, index) => {
                      return `<option >${value}</option>`;
                      // return `<option value='${index}'>${value}</option>`;
                    })}
                </select>
            </div>

            <div class="detail__container--desc-color">
                <p>Color</p>
                <ul class="">
                    ${content.colors
                      .map((value) => {
                        return `
                            <li data-color=${value} class=${value}>
                                <p data-color=${value}></p>
                            </li>
                        `;
                      })
                      .join(" ")}
                </ul>
            </div>
            <div class="detail__container--desc-buy ">
                <div class="detail__container--desc-buy-count">
                    <button>-</button>
                    <input id="quantityProduct" type="number" value="1" min='1'>
                    <button>+</button>
                </div>
                <button id='addToCart'  class="btn--cart btn btn-black ">Add to cart</button>
            </div>
            <div class="detail__container--desc-tag">
                <div class="detail__container--desc-tag_first">
                    <p>Tags: </p>
                    <div>
                    ${content.tags
                      .map((value) => {
                        return `<button>${value}</button>`;
                      })
                      .join(" ")}
                    </div>
                </div>
                <div class="detail__container--desc-tag_two">
                    <p>Category: </p>
                    <div>
                    ${content.category
                      .map((value) => {
                        return `<a href="">${value},</a>`;
                      })
                      .join(" ")}
                       
                    </div>
                </div>
                <!-- <div class="seperate">|</div> -->
                <div class="detail__container--desc-tag_three">
                    <p>SKU: </p>
                    <button>${content.SKU}</button>
                </div>
            </div>
        </div>
        <div class="detail__container--image">
            <div class="detail__container--image-button">
                      ${content.listImage
                        .map((value) => {
                          return `
                            <div>
                                <img src=${value} alt="">
                            </div>
                        `;
                        })
                        .join(" ")}
            </div>
            <div class="detail__container--image-icon">
                <div class="detail__container--image-icon_top">
                    <button>ON SALE</button>
                    <button><ion-icon name="search-outline"></ion-icon></button>
                </div>
                <img src=${content.image} alt="">
            </div>
        </div>
    `;
});

detailContainer.innerHTML = viewDetailProduct.join("");

// lấy ra thông tin sản phẩm để thêm vào giỏ hàng

// thông tin sản phẩm node
const heightCartNode = document.querySelectorAll(
  ".detail__container--desc-height > div > button"
);
const ageCartNode = document.querySelector(
  ".detail__container--desc-age > select"
);

const colorCartNode = document.querySelectorAll(
  ".detail__container--desc-color > ul > li"
);
const colorCartNodePTag = document.querySelectorAll(
  ".detail__container--desc-color > ul > li > p"
);

const addToCart = document.getElementById("addToCart");

const quantityProduct = document.getElementById("quantityProduct");
// ----------------------------------------------------------------

// lấy thông tin chiều cao sản phẩm
let heightCart;
Array.from(heightCartNode).forEach((node) => {
  node.addEventListener("click", (e) => {
    Array.from(heightCartNode).forEach((n) => {
      n.classList.remove("activeHeight");
    });
    // add "activeHeight" class to clicked node
    e.target.classList.add("activeHeight");
    heightCart = +e.target.textContent;
    console.log(heightCart);
  });
});

// lấy ra thông tin độ tuổi
let ageCart;
ageCartNode.addEventListener("change", (e) => {
  ageCart = e.target.value;
  console.log(ageCart);
});

// lấy ra thông tin màu sắc của sản phẩm
let colorCart;
Array.from(colorCartNode).forEach((color) => {
  color.addEventListener("click", (e) => {
    Array.from(colorCartNodePTag).forEach((n) => {
      n.classList.remove("activeColor");
    });
    e.target.classList.add("activeColor");
    colorCart = e.target.dataset.color;
  });
});

// lấy ra thông tin số lượng của sản phẩm
let quantityCart = 1;
quantityProduct.addEventListener("change", (e) => {
  quantityCart = +e.target.value;
  console.log("===quantityCart", quantityCart);
});

// add to cart
let carts = JSON.parse(localStorage.getItem("carts")) || [];
console.log("===cart local", carts);

// colorCart !== undefined && ageCart !== undefined && heightCart !== undefined
//   ? (addToCart.disabled = true)
//   : (addToCart.disabled = false);

addToCart.addEventListener("click", (e) => {
  // check tồn tại sản phẩm trong giỏ hàng
  let check = carts?.find((item) => {
    return (
      item.id === productId && item.age === ageCart && item.color === colorCart
    );
  });
  console.log(check);
  if (
    colorCart !== undefined &&
    ageCart !== undefined &&
    heightCart !== undefined
  ) {
    let money = detailProduct[0].sale
      ? detailProduct[0].sale * quantityCart
      : quantityCart * detailProduct[0].price;
    let itemCart = {
      idcart: Math.random().toString(),
      id: detailProduct[0].id(),
      image: detailProduct[0].image,
      height: heightCart,
      name: detailProduct[0].name,
      age: ageCart,
      color: colorCart,
      price: detailProduct[0].sale
        ? detailProduct[0].sale
        : detailProduct[0].price,
      quantity: quantityCart,
      money,
    };
    console.log("===itemCart", itemCart);
    // check tồn tại product trong cart
    console.log("CHECK TỒN TẠI: ", check);
    if (
      check === undefined ||
      check.color !== colorCart ||
      check.height !== heightCart ||
      check.age !== ageCart
    ) {
      console.log("CHƯA TỒN TẠI", carts);
      carts = [...carts, itemCart];
      localStorage.setItem("carts", JSON.stringify(carts));
      window.location.reload();
      // viewItemInCarts();
      // carts = localStorage.setItem("carts", JSON.stringify(carts));
      console.log(carts);
    } else {
      // if (check) {
      console.log("=========THỰC HIỆN UPDATE SẢN PHẨM TỒN TẠI=========");
      const quantityUpdate = check.quantity + quantityCart;
      const moneyUpdate = detailProduct[0].sale
        ? quantityUpdate * detailProduct[0].sale
        : quantityUpdate * detailProduct[0].price;
      console.log("UPDATE FIELDS", quantityUpdate, moneyUpdate);

      const updatePro = JSON.parse(localStorage.getItem("carts")).map((pro) => {
        return pro.id === check.id &&
          pro.color === check.color &&
          pro.age === check.age
          ? { ...pro, quantity: quantityUpdate, money: moneyUpdate }
          : pro;
      });

      console.log("===updatePro", updatePro);

      localStorage.setItem("carts", JSON.stringify(updatePro));
      window.location.reload();
      // carts = localStorage.setItem("carts", JSON.stringify(updatePro));
      // viewItemInCarts();
    }
  } else {
    alert("Nhập đầy đủ thông tin!");
  }
});

const yourcartProducts = document.querySelector(".yourcart__products");
const totalAllMoney = document.getElementById("totalAllMoney");
const displayTotalMoney = document.getElementById("displayTotalMoney");

const viewItemInCarts = () => {
  const viewCarts = JSON.parse(localStorage.getItem("carts")).map((cart) => {
    return `
      <div class="yourcart__products-item">
        <div class="yourcart__products-item-top">
            <div class="yourcart__products-item-left">
                <div style="height: 125px; width: 110px;">
                    <img style="height: 100%; width: 100%; object-fit: contain;"
                        src=${cart.image}
                        alt="">
                </div>
                <ul>
                    <li>
                        <a href="">${cart.name}</a>
                    </li>
                    <li>Height: ${cart.height}</li>
                    <li>Age: ${cart.age}</li>
                    <li>Color: ${cart.color}</li>
                    <li>Price: <span>$${cart.price.toFixed(2)}</span></li>
                </ul>
            </div>
            <div class="yourcart__products-item-right">
                <p>$${cart.money.toFixed(2)}</p>
            </div>
        </div>

        <div class="yourcart__products--item-bottom">
            <div class="detail__container--desc-buy-count">
                <button id="decreaseOnCart" data-iddecrease=${
                  cart.idcart
                }>-</button>
                <input id="quantityProductOnCart" type="number" data-idboth=${
                  cart.idcart
                } value=${cart.quantity} min='1'>
                <button id="increaseOnCart" data-idincrease=${
                  cart.idcart
                }>+</button>
            </div>
            <div>
                <button id="removeItemCart" data-idItem=${
                  cart.idcart
                } ><i class="fa-solid fa-trash"></i> Remove</button>
            </div>
        </div>

    </div>
  `;
  });
  yourcartProducts.innerHTML = viewCarts.join("");

  // tính tổng hóa đơn hàng hóa
  const totalMoneyCarts = () => {
    const result = JSON.parse(localStorage.getItem("carts")).reduce(
      (prev, cur) => {
        return prev + cur.money;
      },
      0
    );
    return (
      (totalAllMoney.innerHTML = `$${result.toFixed(2)}`),
      (displayTotalMoney.innerHTML = `<small>$${result}</small>`)
    );
  };
  totalMoneyCarts();

  // xóa sản phẩm trong giỏ hàng

  const removeItemCartList = document.querySelectorAll("#removeItemCart");

  const cartHandleDecreaseLists = document.querySelectorAll(
    ".detail__container--desc-buy-count > #decreaseOnCart"
  );
  const cartHandleIncreaseLists = document.querySelectorAll(
    ".detail__container--desc-buy-count > #increaseOnCart"
  );
  const quantityProductOnCartLists = document.querySelectorAll(
    "#quantityProductOnCart"
  );
  console.log("===cartHandleDecreaseLists", cartHandleDecreaseLists);
  console.log("===cartHandleIncreaseLists", cartHandleIncreaseLists);
  console.log("===quantityProductOnCartLists", quantityProductOnCartLists);

  // giảm và tăng khi dùng nút input
  Array.from(quantityProductOnCartLists).forEach((nodeBoth) => {
    nodeBoth.addEventListener("change", (e) => {
      const updateItemOnCarts = JSON.parse(localStorage.getItem("carts")).map(
        (cart) => {
          return cart.idcart === e.target.dataset.idboth
            ? {
                ...cart,
                quantity: +e.target.value,
                money: e.target.value * cart.price,
              }
            : cart;
        }
      );
      localStorage.setItem("carts", JSON.stringify(updateItemOnCarts));
      viewItemInCarts();
      viewQuantityOnCarts();

      console.log("===updateItemOnCarts", updateItemOnCarts);
    });
  });

  // giảm sản phẩm khi click
  Array.from(cartHandleDecreaseLists).forEach((nodeDecrease) => {
    nodeDecrease.addEventListener("click", (e) => {
      console.log(e.target.dataset.iddecrease);
      const updateItemOnCarts = JSON.parse(
        localStorage.getItem("carts")
      ).filter((cart) => {
        return cart.idcart === e.target.dataset.iddecrease;
      });
      console.log("===updateItemOnCarts", updateItemOnCarts); // ok
    });
  });

  // xóa sản phẩm theo idcart
  Array.from(removeItemCartList).forEach((node) => {
    node.addEventListener("click", (e) => {
      console.log(node);
      console.log(e.target.dataset.iditem);
      const dataAfterRemove = JSON.parse(localStorage.getItem("carts")).filter(
        (item) => {
          console.log(item.idcart, e.target.dataset.iditem);
          return item.idcart !== e.target.dataset.iditem;
        }
      );
      console.log("===dataAfterRemove", dataAfterRemove);
      localStorage.setItem("carts", JSON.stringify(dataAfterRemove));
      // window.location.reload();
      viewItemInCarts();
      viewQuantityOnCarts();
      console.log(carts);
      carts = JSON.parse(localStorage.getItem("carts")) || [];
      // carts = localStorage.setItem("carts", JSON.stringify(carts));
    });
  });
};

// hiển thị số lượng trên giỏ hàng
const displayQuantityProducts = document.getElementById(
  "displayQuantityProducts"
);
console.log(displayQuantityProducts);

const viewQuantityOnCarts = () => {
  const result = JSON.parse(localStorage.getItem("carts")).reduce(
    (prev, cur) => {
      return prev + cur.quantity;
    },
    0
  );
  console.log("===result", result);
  return (displayQuantityProducts.innerHTML = `${result}`);
};
viewQuantityOnCarts();
viewItemInCarts();
