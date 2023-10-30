import { RouterProvider } from "react-router-dom";

// router
import router from "./router/index";

// store
import { Provider as StoreProvider } from "react-redux";
import { setupStore } from "./store/store";

import "./assets/scss/main.scss";

function App() {
	//console.log(router);

	const store = setupStore();

	return (
		<div className="App">
			<StoreProvider store={store}>
				<RouterProvider router={router} />
			</StoreProvider>
		</div>
	);
}

export default App;
