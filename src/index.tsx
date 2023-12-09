import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { store } from "./app/store";
import { Provider } from "react-redux";

import App from "./App";

const rootElement = document.getElementById("root");

if (rootElement !== null) {
	const root = createRoot(rootElement);

	root.render(
		<StrictMode>
			<Provider store={store}>
				<App />
			</Provider>
		</StrictMode>
	);
}
