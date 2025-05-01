import {cart, removeFromCart, updateDeliveryOption, findQuantity} from '../data/cart.js'
import { findMatchingProduct } from '../data/products.js';
import { deliveryOptions, findDeliveryOption } from './delivery.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
// import '../data/cart-oop.js';
// import '../data/cart-class.js';
import { convertCents } from '../data/money.js';

function renderContent(){  
  let htmlContent='';
  cart.forEach((cartItem)=>{
    let matchingProduct = findMatchingProduct(cartItem.productId);
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
            <div class="price">${matchingProduct.getPrice()}</div>
            <div class="quant-upd-del-container">
              <div>Quantity:${cartItem.quantity}</div>
              <div class="update-text">Update</div>
              <div class="delete-text js-delete-link" data-product-id = ${matchingProduct.id}>Delete</div>
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
      html += `<div class="option js-delivery-option"
      data-product-id = "${matchingProduct.id}"
      data-delivery-option-id="${deliveryOpiton.id}">
        <input ${isChecked?'checked':''} type="radio" name="option-${matchingProduct.id}">
        <div>
          <div class="delivery-date">${dateString}</div>
          <div class="delivery-cost">${priceString} Shipping</div>
        </div>
      </div>`
    });
    return html;
  }
  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click',()=>{
      const {productId, deliveryOptionId} = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderContent();
    });
  });
  
  document.querySelectorAll('.js-delete-link').forEach(element => {
    const {productId} = element.dataset;
    element.addEventListener('click', () => {
      removeFromCart(productId);
      renderContent();
    });
  });
  let itemsCostCents = 0;
  let shippingCostCents=0;
  cart.forEach(cartItem => {
    let matchingProduct = findMatchingProduct(cartItem.productId);
    itemsCostCents += cartItem.quantity * matchingProduct.priceCents;
    let deliveryOption = findDeliveryOption(cartItem.deliveryOptionId);
    shippingCostCents += deliveryOption.priceCents;
  });
  let beforeTaxCents = itemsCostCents + shippingCostCents;
  let taxCents= Math.round(beforeTaxCents)*0.1;
  let totalCents= Math.round(beforeTaxCents+taxCents);
  document.querySelector('.js-order-summary').innerHTML=
  `<div>
      <b>Order Summary</b>
    </div>
    <div class="order-summary-row"> 
      <div class="order-summary-text">
        Items(3): 
      </div>
      <div class="order-summary-cost">
        $${convertCents(itemsCostCents)}
      </div>
    </div>
    <div class="order-summary-row"> 
      <div class="order-summary-text">
        Shipping & handling:
      </div>
      <div class="order-summary-cost">
        $${convertCents(shippingCostCents)}
      </div>
    </div>
    <div class="order-summary-row"> 
      <div class="order-summary-text">
        Total before tax: 
      </div>
      <div class="order-summary-cost">
        $${convertCents(beforeTaxCents)}
      </div>
    </div>
    <div class="order-summary-row"> 
      <div class="order-summary-text">
        Estimated tax (10%):
      </div>
      <div class="order-summary-cost">
        $${convertCents(taxCents)}
      </div>
    </div>
    <div class="order-summary-row total-row"> 
      <div class="order-summary-text">
        Order total: 
      </div>
      <div class="order-summary-cost">
        $${convertCents(totalCents)}
      </div> 
    </div>
    <div>
      <button class="order-button">
        Place your order
      </button>
    </div>`

    document.querySelector('.js-quantity').innerHTML = `${findQuantity()} items`;
}
renderContent();
