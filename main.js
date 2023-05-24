const productQuerySelector = document.querySelector('.products');

class Products {
  async getProductListing(url) {
    try {
      const products = await fetch(url);
      const data = await products.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  filterPrice(orderBy, products) {
    if (orderBy === 'asc') {
      return products.sort((a, b) => a.price - b.price);
    } else {
      return products.sort((a, b) => b.price - a.price);
    }
  }
}

class UI {
  displayProduct(products) {
    let result = '';
    products.map((product) => {
      result += `<div class="product-card">
		<div class="product-image">
		  <img
		    src=${product.image}
		  />
		</div>
		<div class="product-info">
		  <h5>${product.title}</h5>
		  <h6>$${product.price}</h6>
		</div>
	      </div>`;
    });

    productQuerySelector.innerHTML = result;
  }
}

document.addEventListener('DOMContentLoaded', (event) => {
  const ui = new UI();
  const products = new Products();

  const url = 'https://fakestoreapi.com/products';

  let productList = [];

  products.getProductListing(url).then((data) => {
    productList = data;
    ui.displayProduct(data);
  });

  document
    .querySelector('.price-change')
    .addEventListener('change', (event) => {
      const filteredProduct = products.filterPrice(
        event.target.value,
        productList
      );

      ui.displayProduct(filteredProduct);
    });
});
