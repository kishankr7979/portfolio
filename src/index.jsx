import { render } from 'preact';
import { LocationProvider, Router, Route } from 'preact-iso';


import { Home } from './pages/Home/index.jsx';
import { NotFound } from './pages/_404.jsx';
import './VT323/VT323-Regular.ttf';
import './style.css';
import {useState} from "preact/hooks";
import {GlobalContext} from "./context/GlobalContext";

export function App() {
	const [appStore, setAppStore] = useState(() => {
		const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
		const mode = params.get('mode');
		if (mode) {
			return { isCLIActive: mode === 'cli' || mode === 'terminal' };
		}
		// Fallback to local storage or default to GUI for standard landing, but support CLI default
		const saved = typeof window !== 'undefined' ? localStorage.getItem('userPreference') : null;
		if (saved) {
			return { isCLIActive: saved === 'CLI' };
		}
		return { isCLIActive: false }; // Default to GUI for a stunning visual first impression
	});

	const updateStore = (val) => setAppStore(prevState => ({ ...prevState, ...val }));

	const value = {
		appStore,
		updateStore
	}

	return (
		<LocationProvider>
			<GlobalContext.Provider value={value}>
				<Router>
					<Route path="/" component={Home} />
					<Route default component={NotFound} />
				</Router>
			</GlobalContext.Provider>
		</LocationProvider>
	);
}

render(<App />, document.getElementById('app'));
