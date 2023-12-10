export function setCartLocalStore(products, productsDiscount, discountCart) {
	const cart = {
		products: [],
		discountProducts: [],
		discount: discountCart ?? null,
	};

	// товары
	if (products.length) {
		products.forEach((product) => {
			let item = {
				code: product.code,
				quanty: product.quanty,
				discount: productsDiscount[Number(product.code)] ?? null,
			};

			cart.products.push(item);
		});
	}

	localStorage.setItem("cart", JSON.stringify(cart));

	//console.log(cart);
	//console.log(products);
	//console.log(productsDiscount);
	// console.log(discountCart);
}

export function getCartLocalStore() {
	const cart = localStorage.getItem("cart");

	return cart ? JSON.parse(cart) : null;
}
