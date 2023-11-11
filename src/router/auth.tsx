import { redirect } from "react-router-dom";

// utils
import { isActive } from "@/utils/auth";

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
				loader: async () => {
					// kassa
					await isActive("kassa").then((response) => {
						if (response) throw redirect("/auth/user");
					});

					return true;
				},
			},

			{
				path: "user",
				element: <UserAuthorization />,
				loader: async () => {
					// kassa
					await isActive("kassa").then((response) => {
						if (!response) throw redirect("/auth");
					});

					// kassa
					await isActive("user").then((response) => {
						if (response) throw redirect("/");
					});

					return true;
				},
			},
		],
	},
];

export default auth;
