// data
import selectedProducts from "@/data/selected-products";

export function getSelectedProducts() {
	return new Promise((resolve) => {
		resolve(selectedProducts.products);
	});
}
