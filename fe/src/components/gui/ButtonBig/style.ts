import { palette } from 'fe-utils/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	text: {
		backgroundColor: 'rgba(255, 255, 255, 0.1)',
		borderColor: palette.deco.hex,
		borderWidth: 1,
		borderRadius: 17,
		color: palette.deco.hex,
		fontFamily: 'Bitter',
		fontSize: 20,
		letterSpacing: 5,
		paddingHorizontal: 35,
		paddingVertical: 18,
		overflow: 'hidden',
	},
	textPressed: {
		backgroundColor: 'rgba(255, 255, 255, 0.5)',
	},
});
