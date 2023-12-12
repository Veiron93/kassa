const catalog = {
	products: [
		{ name: "Пакет белый", category_id: null, price: 5, code: "23223232", leftover: 3 },
		{
			name: "Стекло iPhone",
			category_id: 2,
			price: 450,
			code: "444444",
			leftover: 32,
			skus: [
				{ name: "11", price: 350, leftover: 7, code: "333" },
				{ name: "14 Pro Max", price: 690, leftover: 3, code: "43434" },
				{ name: "15 Pro", price: 580, leftover: 11, code: "44322332" },
			],
		},
		{ name: "Чехол iPhone 14", category_id: 2, price: 650, code: "3232223", leftover: 5 },
		{ name: "Подставка для iPad", category_id: 2, price: 700, code: "2323232323", leftover: 22 },
		{
			name: "Адаптер питания Kuulaa 20w C+A",
			category_id: 2,
			price: 1200,
			code: "6932172606909",
			leftover: 9,
			skus: [
				{ name: "Синий", price: 600, leftover: 2, code: "32323" },
				{ name: "Красный", price: 800, leftover: 1, code: "434343" },
				{ name: "Зелёный", price: 900, leftover: 2, code: "988881" },
			],
		},
	],

	categories: [
		{ id: 1, name: "Авто", parent_id: null },
		{ id: 2, name: "Смартфоны", parent_id: null },
		{ id: 3, name: "Компьютеры", parent_id: null },
		{ id: 3, name: "OBD2 сканеры", parent_id: 1 },
	],

	favorites: [
		{ type: 1, identificator: "23223232", position: 1 },
		{ type: 2, identificator: 2, position: 3 },
	],
};

export default catalog;
