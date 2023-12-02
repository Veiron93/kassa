export function setCartLocalStore(products, productsDiscount, discountCart) {
	const cart = {
		products: [],
		discountProducts: [],
		discount: null,
	};

	// товары
	if (products.length) {
		products.forEach((product) => {
			let item = {
				code: product.code,
				quanty: product.quanty,
			};

			cart.products.push(item);
		});
	}

	// товары со скидкой
	if (productsDiscount.length) {
	}

	// скидка на всю корзину

	localStorage.setItem("cart", JSON.stringify(cart));

	//console.log(cart);
	//console.log(products);
	console.log(productsDiscount);
	// console.log(discountCart);
}
