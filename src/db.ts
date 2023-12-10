import Dexie, { Table } from "dexie";

import { Product } from "@/models/products";

export class MySubClassedDexie extends Dexie {
	products!: Table<Product>;

	constructor() {
		super("kassa");

		this.version(1).stores({
			products: "++id, code",
		});
	}
}

export const db = new MySubClassedDexie();
