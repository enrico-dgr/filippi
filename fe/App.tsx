import React from 'react';
import Routing from 'fe-screens/Routing';

import { Provider } from 'react-redux';
import store from 'fe-redux/store';
import useLoaders from './src/app/useLoaders';

export default function App() {
	const [assetsLoaded] = useLoaders();

	return (
		assetsLoaded && (
			<Provider store={store}>
				<Routing />
			</Provider>
		)
	);
}
