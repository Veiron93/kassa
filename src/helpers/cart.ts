import { Product, Discount } from "@/models/products";

export function priceProduct(product: Product, discount: Discount | null = null) {
	let priceProduct: number = 0;
	let unitPriceProduct: number = 0;
	let discountSum: number = 0;

	let valueDiscount: number = 0;
	let typeValueDiscount: number | null = null;
	let rangeDiscount: number | null = null;

	if (discount) {
		valueDiscount = discount.value;
		typeValueDiscount = discount.typeValue;
		rangeDiscount = discount.range;
	} else {
		priceProduct = product.price * product.quanty;
		unitPriceProduct = product.price;
	}

	// скидка в рублях
	if (typeValueDiscount === 1) {
		// на один товар
		if (rangeDiscount === 1) {
			let x = product.price - valueDiscount;
			let x2 = product.price * (product.quanty - 1);

			priceProduct = x + x2;
			unitPriceProduct = product.price - valueDiscount / product.quanty;
			discountSum = valueDiscount;
		}

		// на каждый товар
		if (rangeDiscount === 2) {
			let x = valueDiscount * product.quanty;

			priceProduct = product.price * product.quanty - x;
			unitPriceProduct = product.price - valueDiscount;
			discountSum = x;
		}

		// распределение скидки на всё количество
		if (rangeDiscount === 3) {
			priceProduct = product.price * product.quanty - valueDiscount;
			unitPriceProduct = product.price - valueDiscount / product.quanty;
			discountSum = valueDiscount;
		}
	}

	// скидка в процентах
	if (typeValueDiscount === 2) {
		// на один товар
		if (rangeDiscount === 1) {
			let x = (product.price / 100) * valueDiscount;
			let x2 = product.price * product.quanty;

			priceProduct = x2 - x;
			unitPriceProduct = (product.price * product.quanty - x) / product.quanty;
			discountSum = x;
		}

		// на каждый товар
		if (rangeDiscount === 2) {
			let x = (product.price / 100) * valueDiscount;
			let x2 = product.quanty * x;

			priceProduct = product.price * product.quanty - x2;
			unitPriceProduct = product.price - x;
			discountSum = x * product.quanty;
		}

		// распределение скидки на всё количество
		if (rangeDiscount === 3) {
			let x = (product.price / 100) * valueDiscount;

			priceProduct = (product.price - x) * product.quanty;
			unitPriceProduct = product.price - x;
			discountSum = x * product.quanty;
		}
	}

	return {
		priceProduct: priceProduct,
		unitPriceProduct: unitPriceProduct,
		discountSum: discountSum,
	};
}

export function getDiscountCart(productsDiscount: any, productCart: Array<Product>): number {
	let discount = 0;

	if (Object.keys(productsDiscount).length || productCart.length) {
		productCart.forEach((productCart) => {
			let code = productCart.code;

			if (!productsDiscount[code]) {
				return false;
			}

			let prices = priceProduct(productCart, productsDiscount[code]);

			if (prices.discountSum) {
				discount += prices.discountSum;
			}
		});
	}

	return discount;
}
