import React from 'react';
import Routing from 'fe-screens/Routing';
import { useFonts } from 'expo-font';

export default function App() {
	const [fontsLoaded] = useFonts({
		'Bitter-Regular': require('./assets/fonts/bitter/Bitter-Regular.ttf'),
		'Open-Sans-Regular': require('./assets/fonts/open-sans/OpenSans-Regular.ttf'),
	});

	return fontsLoaded && <Routing />;
}
