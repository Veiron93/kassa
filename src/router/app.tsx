import { redirect } from "react-router-dom";

// utils
import { isActive } from "@/utils/auth";

// components
import Layout from "../layouts/Layout/Layout";

// pages
import Index from "../pages/Index/Index";
import Products from "../pages/Products/Products";
import Payment from "../pages/Payment/Payment";
import Settings from "../pages/Settings/Settings";
import PaymentResult from "../pages/Payment/PaymentResult";

const app = [
	{
		path: "/",
		element: <Layout />,

		loader: async () => {
			// kassa
			await isActive("kassa").then((response) => {
				if (!response) throw redirect("/auth");
			});

			// user
			await isActive("user").then((response) => {
				if (!response) throw redirect("/auth/user");
			});

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
