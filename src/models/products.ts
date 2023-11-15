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
	quanty: number;
	discount?: Discount;
}
