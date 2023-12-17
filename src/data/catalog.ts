const catalog = {
	products: [
		{ id: 1, name: "Пакет белый", categoryId: null, price: 5, code: "23223232", leftover: 3 },
		{
			id: 3,
			name: "Стекло iPhone",
			category_id: 2,
			price: 450,
			code: "444444",
			leftover: 32,
			skus: [
				{ id: 22, name: "11", price: 350, leftover: 7, code: "333" },
				{ id: 44, name: "14 Pro Max", price: 690, leftover: 3, code: "43434" },
				{ id: 11, name: "15 Pro", price: 580, leftover: 11, code: "44322332" },
			],
		},
		{ id: 4, name: "Чехол iPhone 14", categoryId: 2, price: 650, code: "3232223", leftover: 5 },
		{ id: 5, name: "Подставка для iPad", categoryId: 2, price: 700, code: "2323232323", leftover: 22 },
		{
			id: 88,
			name: "Адаптер питания Kuulaa 20w C+A",
			categoryId: 2,
			price: 1200,
			code: "6932172606909",
			leftover: 9,
			skus: [
				{ id: 98, name: "Синий", price: 600, leftover: 2, code: "32323" },
				{ id: 45, name: "Красный", price: 800, leftover: 1, code: "434343" },
				{ id: 59, name: "Зелёный", price: 900, leftover: 2, code: "988881" },
			],
		},
	],

	categories: [
		{ id: 1, name: "Авто", parentId: null },
		{ id: 2, name: "Смартфоны", parentId: null },
		{ id: 3, name: "Компьютеры", parentId: null },
		{ id: 9, name: "OBD2 сканеры", parentId: 1 },
		{ id: 11, name: "Наушники", parentId: 2 },
		{ id: 12, name: "Чехлы", parentId: 2 },
		{ id: 13, name: "Защитные стёкла", parentId: 2 },
		{ id: 14, name: "Аудио", parentId: 1 },
	],

	favorites: [
		{ type: 1, idItem: "23223232", position: 1 },
		{ type: 1, idItem: "3232223", position: 27 },
		{ type: 1, idItem: "6932172606909", position: 9 },
		{ type: 2, idItem: 2, position: 3 },
	],
};

export default catalog;
