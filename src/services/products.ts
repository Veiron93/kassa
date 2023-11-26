// models
import { Product } from "@/models/products";

// data
import products from "@/data/products";

export function getProduct(code: string): Promise<Product | undefined> {
	return new Promise((resolve) => {
		let product = products.products.find((product) => product.code === code);
		resolve(product);
	});
}
