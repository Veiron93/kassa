const products = {
	products: [
		{ name: "Пакет белый", price: 5, code: "23223232", leftover: 3 },
		{
			name: "Стекло iPhone",
			price: 450,
			code: "444444",
			leftover: 32,
			skus: [
				{ name: "11", price: 350, leftover: 7, code: "333" },
				{ name: "14 Pro Max", price: 690, leftover: 3, code: "43434" },
				{ name: "15 Pro", price: 580, leftover: 11, code: "44322332" },
			],
		},
		{ name: "Чехол iPhone 14", price: 650, code: "3232223", leftover: 5 },
		{ name: "Подставка для iPad", price: 700, code: "2323232323", leftover: 22 },
		{
			name: "Адаптер питания Kuulaa 20w C+A",
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
};

export default products;
