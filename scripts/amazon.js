import {products} from '../data/products.js'
let productsHTML = '';
products.forEach((product) =>{
  // console.log(product)
  productsHTML+=`<div class="product-container">
        <div class="product-image-container">
          <img class="product-image" src="${product.image}">
        </div>
        <div class="product-name">${product.name}</div>
        <div class="rating">
            <img class="rating-image" src="images/ratings/rating-${(product.rating.stars*10)}.png">
            <div class="count">${product.rating.count}</div>
        </div>
        <div class="product-price">$${(product.priceCents/100).toFixed(2)}</div>
        <div>
          <select class="quantity-selector">
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
        <button class="add-to-cart-button">Add to Cart</button>
      </div>`
});

document.querySelector('.js-products-grid-container').innerHTML = productsHTML;
