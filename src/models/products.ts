export interface Discount {
	value: number;
	typeValue: number | null;
	range: number | null;
}

export interface Product {
	code: string;
	name: string;
	price: number;
	leftover: number;
	skus?: Array<Product>;
}

export interface ProductCart extends Product {
	quanty: number;
	discount?: Discount;
}
