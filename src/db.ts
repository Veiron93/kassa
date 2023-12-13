import Dexie, { Table } from "dexie";

// models
import { Product, Category, Favorite } from "@/models/catalog";

export class MySubClassedDexie extends Dexie {
	products!: Table<Product>;
	categories!: Table<Category>;
	favorites!: Table<Favorite>;

	constructor() {
		super("kassa");

		this.version(1).stores({
			products: "++id, code",
			categories: "++id, id",
			favorites: "++id, position",
		});
	}
}

export const db = new MySubClassedDexie();
