import { useFonts } from 'expo-font';

const useLoaders = () => {

	const [fontsLoaded] = useFonts({
		'Bitter-Regular': require('fe-assets/fonts/bitter/Bitter-Regular.ttf'),
		'Open-Sans-Regular': require('fe-assets/fonts/open-sans/OpenSans-Regular.ttf'),
	});

	return [fontsLoaded];
};

export default useLoaders;
