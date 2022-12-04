import baseStyle from 'fe-utils/baseStyle';
import palette from 'fe-utils/palette';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	modalWrapper: {
		...baseStyle.modalWrapper,
		alignItems: 'center',
		justifyContent: 'center',
	},
	modalWrapperOnUnset: {
		display: 'none',
	},
	modalBackground: {
		...baseStyle.modalWrapper,
		backgroundColor: palette.black.hex,
	},
	modal: {
		backgroundColor: 'black',
		paddingHorizontal: 30,
		paddingVertical: 40,
		width: '55%',
	},
	modalOnError: {
		backgroundColor: palette['tall-poppy'].hex,
	},
	text: {
		color: 'white',
		...baseStyle.paragraphLarge,
	},
	textOnError: {},
});
