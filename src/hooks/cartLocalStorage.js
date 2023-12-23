export function setCartLocalStore(products = null, productsDiscount = null, discountCart = null) {
	const cart = {
		products: [],
		discountProducts: productsDiscount ?? null,
		discount: discountCart ?? null,
	};

	// товары
	if (products.length) {
		products.forEach((product) => {
			let item = {
				code: product.code,
				quantity: product.quantity,
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
