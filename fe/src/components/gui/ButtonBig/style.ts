import palette from 'fe-utils/palette';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	textContainer: {
		borderColor: palette.deco.hex,
		borderWidth: 1,
		borderRadius: 17,
		height: 60,
		width: 145,
		flexDirection: 'column',
		justifyContent: 'center',
	},
	textContainerPressed: {
		backgroundColor: palette.java.getRgba(0.1),
	},
	text: {
		color: palette.deco.hex,
		fontFamily: 'Bitter-Regular',
		fontSize: 20,
		letterSpacing: 5,
		textAlign: 'center',
	},
	textPressed: {
		color: palette.affair.hex,
	},
});
