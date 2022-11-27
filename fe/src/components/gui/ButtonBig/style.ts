import { palette } from 'fe-utils/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	textContainer: {
		backgroundColor: 'rgba(255, 255, 255, 0.1)',
		borderColor: palette.deco.hex,
		borderWidth: 1,
		borderRadius: 17,
		height: 55,
		width: 150,
		flexDirection: 'column',
		justifyContent: 'center',
	},
	textContainerPressed: {
		backgroundColor: 'rgba(255, 255, 255, 0.5)',
	},
	text: {
		color: palette.deco.hex,
		fontFamily: 'Bitter-Regular',
		fontSize: 20,
		letterSpacing: 5,
		textAlign: 'center',
	},
});
