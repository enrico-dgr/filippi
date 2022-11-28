import { palette } from 'fe-utils/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	cardButton: {
		borderWidth: 1,
		height: 60,
		width: 60,
		marginRight: 20,
		marginBottom: 10,
	},
	cardButtonPressed: {
		backgroundColor: 'rgba(255, 255, 255, 0.4)',
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
	},
	cardButtonContent: {
		flexDirection: 'column',
		justifyContent: 'center',
	},
	cardButtonText: {
		color: palette.deco.hex,
		textAlign: 'center',
	},
});
