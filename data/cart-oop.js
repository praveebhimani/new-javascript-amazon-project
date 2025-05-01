function Cart(localStorageKey){
  const cart = {
    cartItems: undefined,
    loadFromStorage(){
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [{
        productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity:1,
        deliveryOptionId:'1'
      }];
    },
    addToCart(productId){
      let matchingProduct;
      this.cartItems.forEach(cartItem => {
        if(cartItem.productId === productId){
          matchingProduct = cartItem;
        }
      });
      let element=document.querySelector(`.js-quantity-selector-${productId}`);
      let quantity = element!==null ? element.quantity : 1;
      if(matchingProduct){
        matchingProduct.quantity+=quantity;
      }else{
        this.cartItems.push({productId,quantity,deliveryOptionId:'1'});
      }
      this.saveToStorage();
    },
    saveToStorage(){
      localStorage.setItem(localStorageKey,JSON.stringify(this.cartItems));
    },
    updateDeliveryOption(productId, deliveryOptionId){
      let matchingProduct;
      this.cartItems.forEach(cartItem => {
        if(cartItem.productId === productId){
          matchingProduct = cartItem;
        }
      });
      matchingProduct.deliveryOptionId = deliveryOptionId;
      this.saveToStorage();
    },
    removeFromCart(productId){
      let newCart= [];
      this.cartItems.forEach(cartItem => {
        if(cartItem.productId !== productId){
          newCart.push(cartItem);
        }
      });
      this.cartItems=newCart;
      this.saveToStorage();
    },
    findQuantity(){
      let quantity=0;
      this.cartItems.forEach(cartItem=>{
        quantity+=cartItem.quantity;
      })
      return quantity;
    }
  };
  return cart;
}
const cart = Cart('cart-oop');
cart.loadFromStorage();
const businessCart = Cart('cart-business');
businessCart.loadFromStorage();
console.log(cart);
console.log(businessCart);