import { render } from 'preact';
import { LocationProvider, Router, Route } from 'preact-iso';
import { ChakraProvider } from '@chakra-ui/react'
import * as ReactDOM from 'react-dom/client'


import { Home } from './pages/Home/index.jsx';
import { NotFound } from './pages/_404.jsx';
import './VT323/VT323-Regular.ttf';
import './style.css';
import {useState} from "preact/hooks";
import {GlobalContext} from "./context/GlobalContext";

export function App() {
	const [appStore, setAppStore] = useState({
		isCLIActive: true,
	});

	const updateStore = (val) => setAppStore(val);

	const value = {
		appStore,
		updateStore
	}

	return (
		<LocationProvider>
			<GlobalContext.Provider value={value}>
			<ChakraProvider>
				<Router>
					<Route path="/" component={Home} />
					<Route default component={NotFound} />
				</Router>
			</ChakraProvider>
			</GlobalContext.Provider>
		</LocationProvider>
	);
}

render(<App />, document.getElementById('app'));
