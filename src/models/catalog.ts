export interface Discount {
	value: number;
	typeValue: number | null;
	range: number | null;
}

export interface Product {
	id: number | null;
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

export interface CategoryFavorite extends Category {
	type: number;
	position: number;
}

export interface Favorite {
	type: number;
	idItem: string | number;
	position: number;
}

export interface ProductCart extends Product {
	quantity: number;
	discount?: Discount;
}
