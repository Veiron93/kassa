import { redirect } from "react-router-dom";

// utils
import { isActiveKassa } from "@/utils/kassa";

// services
import { onUserIsLogIn } from "@/services/users";
import { modeCheck } from "@/services/mode";

// components
import LayoutAuth from "@/layouts/LayoutAuth/LayoutAuth";

// views
import KassaAuthorization from "@/pages/Auth/KassaAuthorization/KassaAuthorization";
import UserAuthorization from "@/pages/Auth/UserAuthorization/UserAuthorization";

let modeState: boolean | null = null;

const auth = [
	{
		path: "/auth",
		element: <LayoutAuth />,

		children: [
			{
				path: "/auth",
				element: <KassaAuthorization />,

				loader: async () => {
					await modeCheck()
						.then(() => (modeState = true))
						.catch(() => (modeState = false));

					if (modeState) {
						await isActiveKassa().then((response) => {
							if (response) throw redirect("/auth/user");
						});
					} else {
						console.log("невозможно активировать кассу без доступа к интернет");
					}

					return true;
				},
			},

			{
				path: "user",
				element: <UserAuthorization />,

				loader: async () => {
					//console.log(22222);

					await modeCheck()
						.then(() => (modeState = true))
						.catch(() => (modeState = false));

					// kassa
					if (modeState) {
						await isActiveKassa().then((response) => {
							if (!response) {
								throw redirect("/auth");
							}
						});
					} else {
						console.log("невозможно активировать кассу без доступа к интернет");
					}

					// user
					const user = onUserIsLogIn();

					if (user !== null) {
						throw redirect("/");
					}

					return true;
				},
			},
		],
	},
];

export default auth;
