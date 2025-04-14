import {products} from '../data/products.js'
export let cart = JSON.parse(localStorage.getItem('cart')) || [];
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
    cart.push({productId,quantity});
  }
  localStorage.setItem('cart',JSON.stringify(cart));
}
