import { redirect } from "react-router-dom";

// components
import LayoutAuth from "@/components/LayoutAuth/LayoutAuth";

// views
import KassaAuthorization from "@/pages/Auth/KassaAuthorization/KassaAuthorization";
import UserAuthorization from "@/pages/Auth/UserAuthorization/UserAuthorization";

const auth = [
	{
		path: "/auth",
		element: <LayoutAuth />,

		children: [
			{
				path: "/auth",
				element: <KassaAuthorization />,
				loader: () => {
					const tokenKassa = localStorage.getItem("kassaToken");

					if (tokenKassa) {
						throw redirect("/auth/user");
					}

					return true;
				},
			},

			{
				path: "user",
				element: <UserAuthorization />,
				loader: () => {
					const tokenKassa = localStorage.getItem("kassaToken");
					const userIdKassa = localStorage.getItem("userIdKassa");

					if (!tokenKassa) {
						throw redirect("/auth");
					}

					if (tokenKassa && userIdKassa) {
						throw redirect("/");
					}

					return true;
				},
			},
		],
	},
];

export default auth;
