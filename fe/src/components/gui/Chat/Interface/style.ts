import palette from 'fe-utils/palette';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		backgroundColor: palette['fuchsia-pink'].hex,
		position: 'absolute',
		left: 0,
		top: 0,
		zIndex: 2,
		height: '100%',
		width: '100%',
	},
	chatsList: {},
});
