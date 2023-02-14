import baseStyle from 'fe-utils/baseStyle';
import palette from 'fe-utils/palette';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		height: 30,
		width: 500,
	},
	user: {
		color: palette.java.hex,
		...baseStyle.paragraphLarge,
	},
	message: {
		color: 'white',
		...baseStyle.paragraph,
	},
});
