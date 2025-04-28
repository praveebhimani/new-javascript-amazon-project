import {cart} from '../data/cart.js'
import { products } from '../data/products.js';
import { deliveryOptions } from './delivery.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
let htmlContent='';
cart.forEach((cartItem)=>{
  let matchingProduct;
  products.forEach(product =>{
    if(product.id === cartItem.productId){
      matchingProduct=product;
    }
  });

  const deliveryOptionId = cartItem.deliveryOptionId;
  let deliveryOption;
  deliveryOptions.forEach((option) => {
    if(option.id === deliveryOptionId){
      deliveryOption = option;
    }
  });
  const today = dayjs();
  const deliveryDate = today.add(
    deliveryOption.deliveryDays,
    'days'
  );
  const dateString = deliveryDate.format(
    'dddd, MMMM D'
  );
  htmlContent += `
  <div class="cart-item">
    <div class="delivery-info">Delivery date: ${dateString}</div>
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
          ${deliveryOptionsHTML(matchingProduct, deliveryOptionId)}
        </div>
      </div>
    </div>
  </div>
`
});
document.querySelector('.js-cart-items').innerHTML=htmlContent;

function deliveryOptionsHTML(matchingProduct, deliveryOptionId){
  let html='';
  deliveryOptions.forEach((deliveryOpiton) => {
    const today = dayjs();
    const deliveryDate = today.add(
      deliveryOpiton.deliveryDays,
      'days'
    );
    const dateString = deliveryDate.format(
      'dddd, MMMM D'
    );
    const priceString = deliveryOpiton.priceCents === 0
    ? 'FREE'
    : `$${(deliveryOpiton.priceCents/100).toFixed(2)}`;
    const isChecked = deliveryOpiton.id === deliveryOptionId;
    html += `<div class="option">
      <input ${isChecked?'checked':''} type="radio" name="option-${matchingProduct.id}">
      <div>
        <div class="delivery-date">${dateString}</div>
        <div class="delivery-cost">${priceString} Shipping</div>
      </div>
    </div>`
  });
  return html;
}