import baseStyle from 'fe-utils/baseStyle';
import palette from 'fe-utils/palette';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		backgroundColor: 'black',
		paddingHorizontal: 30,
		paddingVertical: 40,
		width: '55%',
		position: 'absolute',
		left: '25%',
		top: '20%',
		zIndex: 3,
	},
	containerOnUnset: {
		display: 'none',
	},
	containerOnError: {
		backgroundColor: palette['tall-poppy'].hex,
	},
	text: {
		color: 'white',
		...baseStyle.paragraphLarge,
	},
	textOnError: {},
});
