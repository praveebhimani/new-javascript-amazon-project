import {cart} from '../data/cart.js'
import { products } from '../data/products.js';

let htmlContent='';
console.log(cart);
cart.forEach((cartItem)=>{
  let matchingProduct;
  products.forEach(product =>{
    if(product.id === cartItem.productId){
      matchingProduct=product;
    }
  });
  console.log(matchingProduct);
  htmlContent += `
  <div class="cart-item">
    <div class="delivery-info">Delivery date: Monday, April 28</div>
    <div class="container">
      <div class="cart-item-info">
        <div class="cart-item-image-container">
          <img class="cart-item-image" src="${matchingProduct.image}">
        </div>
        <div class="cart-item-details">
          <div class="cart-item-name">${matchingProduct.name}</div>
          <div class="price">$${(matchingProduct.priceCents/100).toFixed(2)}</div>
          <div class="quant-upd-del-container">
            <div>Quantity:${cartItem.quantity}</div>
            <div class="update-text">Update</div>
            <div class="delete-text">Delete</div>
          </div>
        </div>
        <div class="delivery-container">
          Choose a delivery option:
          <div class="option">
            <input checked type="radio" name="option-${matchingProduct.id}">
            <div>
              <div class="delivery-date">Monday, April 28</div>
              <div class="delivery-cost">FREE Shipping</div>
            </div>
          </div>
          <div class="option">
            <input type="radio" name="option-${matchingProduct.id}">
            <div>
              <div class="delivery-date">Tuesday, April 22</div>
              <div class="delivery-cost">$4.99 - Shipping</div>
            </div>
          </div>
          <div class="option">
            <input type="radio" name="option-${matchingProduct.id}">
            <div>
              <div class="delivery-date">Friday, April 18</div>
              <div class="delivery-cost">$9.99 - Shipping</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
`
});
document.querySelector('.js-cart-items').innerHTML=htmlContent;