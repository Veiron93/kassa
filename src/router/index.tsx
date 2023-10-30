import { createBrowserRouter } from "react-router-dom";

// components
import Layout from "../components/Layout/Layout";

// views
import Index from "../views/Index/Index";
import Products from "../views/Products/Products";
import Payment from "../views/Payment/Payment";
import Settings from "../views/Settings/Settings";

import PaymentResult from "../views/Payment/PaymentResult";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,

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
]);

export default router;
