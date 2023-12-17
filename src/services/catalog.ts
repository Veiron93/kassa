import { Table } from "dexie";

// db
import { db } from "@/db";

// models
import { Product, Category, Favorite } from "@/models/catalog";

// data
import catalog from "@/data/catalog";

// PRODUCTS
// получение товаров с сервера
export function getProductsCatalog(): Promise<Product[]> {
	return new Promise((resolve) => {
		resolve(catalog.products);
	});
}

export function getProduct(code: string): Promise<Product | undefined> {
	return new Promise((resolve) => {
		let product = catalog.products.find((product) => product.code === code);
		resolve(product);
	});
}
// --

// CATEGORIES
// получение категорий с сервера
export function getCategoriesCatalog(): Promise<Category[]> {
	return new Promise((resolve) => {
		resolve(catalog.categories);
	});
}

export function getCategory(id: number): Promise<Category | undefined> {
	return new Promise((resolve) => {
		let category = catalog.categories.find((category) => category.id === id);
		resolve(category);
	});
}
// --

// FAVORITES
// получение избранное с сервера
export function getFavoritesCatalog(): Promise<Favorite[]> {
	return new Promise((resolve) => {
		resolve(catalog.favorites);
	});
}
// --

// запись в indexedDB
export async function setItemsCatalogDB(items: Array<Product | Category | Favorite | []>, table: string) {
	let tableDB: Table<Product | Category | Favorite | []> | null = null;

	if (table === "products") tableDB = db.products;
	if (table === "categories") tableDB = db.categories;
	if (table === "favorites") tableDB = db.favorites;

	if (!tableDB) {
		return null;
	}

	await tableDB.clear();
	return await tableDB.bulkAdd(items);
}
