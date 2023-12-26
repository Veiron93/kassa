import { redirect } from "react-router-dom";

// utils
import { isActiveKassa } from "@/utils/kassa";

// services
import { modeCheck } from "@/services/mode";

// components
import Layout from "../layouts/Layout/Layout";

// pages
import Index from "../pages/Index/Index";
import Products from "../pages/Products/Products";
import Payment from "../pages/Payment/Payment";
import Settings from "../pages/Settings/Settings";
import PaymentResult from "../pages/Payment/PaymentResult";

let modeState: boolean | null = null;

const app = [
	{
		path: "/",
		element: <Layout />,

		loader: async () => {
			//console.log(3333);

			await modeCheck()
				.then(() => (modeState = true))
				.catch(() => (modeState = false));

			// kassa
			if (modeState) {
				//console.log("есть подключение к сети");

				await isActiveKassa().then((response) => {
					if (!response) {
						localStorage.removeItem("user");
						localStorage.removeItem("kassa");

						throw redirect("/auth");
					}
				});
			} else {
				console.log("нет подключения к сети");

				const kassa = JSON.parse(localStorage.getItem("kassa") ?? "null");

				if (!kassa) {
					throw redirect("/auth");
				}
			}

			// user
			const user = JSON.parse(localStorage.getItem("user") ?? "null");

			if (!user) {
				throw redirect("/auth/user");
			}

			return true;
		},

		children: [
			{
				path: "/",
				element: <Index />,
			},

			{
				path: "products",
				element: <Products />,
			},

			{
				path: "settings",
				element: <Settings />,
			},

			{
				path: "payment",

				children: [
					{
						path: "/payment",
						element: <Payment />,
					},
					{
						path: "result",
						element: <PaymentResult />,
					},
				],
			},
		],
	},
];

export default app;
