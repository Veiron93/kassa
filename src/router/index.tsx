import { createBrowserRouter } from "react-router-dom";

// components
import Layout from "../components/Layout/Layout";

// views
import Index from "../views/Index/Index";
import Products from "../views/Products/Products";

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
		],
	},
]);

export default router;
