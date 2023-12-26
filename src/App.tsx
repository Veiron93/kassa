import { RouterProvider } from "react-router-dom";

import "./assets/scss/main.scss";

// router
import router from "./router/index";

// store
import { Provider as StoreProvider } from "react-redux";
import { setupStore } from "./store/store";

function App() {
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
