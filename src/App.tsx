import { RouterProvider } from "react-router-dom";

import "./assets/scss/main.scss";

// router
import router from "./router/index";

// store
import { Provider as StoreProvider } from "react-redux";
import { setupStore } from "./store/store";

function App() {
	const store = setupStore();

	let deferredPrompt: any;

	window.addEventListener("beforeinstallprompt", function (event) {
		// Prevent Chrome 67 and earlier from automatically showing the prompt
		event.preventDefault();
		// Stash the event so it can be triggered later.
		deferredPrompt = event;
	});

	// Installation must be done by a user gesture! Here, the button click
	// btnAdd.addEventListener('click', (e) => {
	//   // hide our user interface that shows our A2HS button
	//   btnAdd.style.display = 'none';
	//   // Show the prompt
	//   deferredPrompt.prompt();
	//   // Wait for the user to respond to the prompt
	//   deferredPrompt.userChoice
	//     .then((choiceResult) => {
	//       if (choiceResult.outcome === 'accepted') {
	//         console.log('User accepted the A2HS prompt');
	//       } else {
	//         console.log('User dismissed the A2HS prompt');
	//       }
	//       deferredPrompt = null;
	//     });
	// });

	return (
		<div className="App">
			<StoreProvider store={store}>
				<RouterProvider router={router} />
			</StoreProvider>
		</div>
	);
}

export default App;
