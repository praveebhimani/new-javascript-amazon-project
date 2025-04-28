import {products} from '../data/products.js'
export let cart = JSON.parse(localStorage.getItem('cart')) || [{
  productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity:1,
  deliveryOptionId:'1'
}];
export function addToCart(productId){
  let matchingProduct;
  cart.forEach(cartItem => {
    if(cartItem.productId === productId){
      matchingProduct = cartItem;
    }
  });
  let quantity=Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
  if(matchingProduct){
    matchingProduct.quantity+=quantity;
  }else{
    cart.push({productId,quantity,deliveryOptionId:'1'});
  }
  localStorage.setItem('cart',JSON.stringify(cart));
}
function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}
export function updateDeliveryOption(productId, deliveryOptionId){
  let matchingProduct;
  cart.forEach(cartItem => {
    if(cartItem.productId === productId){
      matchingProduct = cartItem;
    }
  });
  matchingProduct.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}
export function removeFromCart(productId){
  let newCart= [];
  cart.forEach(cartItem => {
    if(cartItem.productId !== productId){
      newCart.push(cartItem);
    }
  });
  cart=newCart;
  saveToStorage();
}