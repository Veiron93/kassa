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

export interface Category {
	id: number;
	name: string;
	parent_id: number | null;
}

export interface Favorite {
	type: number;
	identificator: string | number;
	position: number;
}

export interface ProductCart extends Product {
	quanty: number;
	discount?: Discount;
}
