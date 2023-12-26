import { useEffect } from "react";

//store
import { useAppDispatch } from "@/store/hooks/redux";
import { ModeSlice } from "@/store/reducers/ModeSlice";

// services
import { modeCheck } from "@/services/mode";

export function useMode() {
	// STORE
	const dispatch = useAppDispatch();

	// actions
	const { setState: setStateMode } = ModeSlice.actions;
	// --

	// время обновления в секундах
	const updateTime = 3;

	useEffect(() => {
		modeCheck()
			.then(() => dispatch(setStateMode(true)))
			.catch(() => dispatch(setStateMode(false)));

		let state: boolean | null = null;

		const idIntervalCheck = setInterval(async () => {
			await modeCheck()
				.then(() => {
					state = true;
					//console.log("онлайн");
				})
				.catch(() => {
					state = false;
					//console.log("офлайн");
				});

			dispatch(setStateMode(state));
		}, updateTime * 1000);

		return () => clearInterval(idIntervalCheck);
	}, []);
}
