const products = {
	products: [
		{ id: 1, name: "Пакет белый", price: 5, count: 2, code: "23223232", leftover: 3 },
		{
			id: 2,
			name: "Стекло iPhone",
			price: 40,
			count: 1,
			code: "444444",
			leftover: 32,
			skus: [
				{ name: "11", price: 350, leftover: 7, code: "333" },
				{ name: "14 Pro Max", price: 690, leftover: 3, code: "43434" },
				{ name: "15 Pro", price: 580, leftover: 11, code: "44322332" },
			],
		},
		{ id: 3, name: "Чехол iPhone 14", price: 650, count: 1, code: "3232223", leftover: 5 },
		{ id: 5, name: "Подставка для iPad", price: 700, count: 1, code: "2323232323", leftover: 22 },
		{ id: 6, name: "Адаптер питания Kuulaa 20w C+A", price: 1200, count: 1, code: "444442232332", leftover: 9 },
	],
};

export default products;
