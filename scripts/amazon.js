import {products} from '../data/products.js'
import {cart, addToCart, findQuantity} from '../data/cart.js'
renderContent();
function renderContent(){
  let productsHTML = '';
  products.forEach((product) =>{
    productsHTML+=`<div class="product-container">
          <div class="product-image-container">
            <img class="product-image" src="${product.image}">
          </div>
          <div class="product-name">${product.name}</div>
          <div class="rating">
              <img class="rating-image" src="${product.getStarsUrl()}">
              <div class="count">${product.rating.count}</div>
          </div>
          <div class="product-price">${product.getPrice()}</div>
          <div>
            <select class="quantity-selector js-quantity-selector-${product.id}">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
            </select>
          </div>
          <button class="add-to-cart-button js-add-to-cart" data-product-id="${product.id}">Add to Cart</button>
        </div>`
  });
  updateCartQuantity();
  document.querySelector('.js-products-grid-container').innerHTML = productsHTML;
  document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click',()=>{
      const productId = button.dataset.productId;
      addToCart(productId);
      updateCartQuantity();
    })
  });

  function updateCartQuantity(){
    document.querySelector('.js-cart-quantity').innerHTML=findQuantity();
  }
}
