import { LogBox } from 'react-native';

export const ignoreLogs = () =>
	LogBox.ignoreLogs([
		/THREE\.WebGLRenderer: ([A-Za-z0-9]+(_[A-Za-z0-9]+)+) extension not supported\./,
	]);
