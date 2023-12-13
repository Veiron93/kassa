export interface Discount {
	value: number;
	typeValue: number | null;
	range: number | null;
}

export interface Product {
	id: number;
	code: string;
	name: string;
	price: number;
	leftover: number;
	categoryId?: number | null;
	skus?: Array<Product>;
}

export interface ProductFavorite extends Product {
	type: number;
	position: number;
}

export interface Category {
	id: number;
	name: string;
	parentId: number | null;
}

export interface Favorite {
	type: number;
	idItem: string | number;
	position: number;
}

export interface ProductCart extends Product {
	quanty: number;
	discount?: Discount;
}
