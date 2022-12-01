import { palette } from 'fe-utils/colors';
import { heading } from 'fe-utils/baseStyle';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		borderBottomColor: palette.java.hex,
		borderBottomWidth: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		height: 48,
		width: 540,
	},
	decoration: {
		borderColor: palette['fuchsia-pink'].hex,
		borderRadius: 16,
		borderWidth: 2,
		borderStyle: 'solid',
		marginRight: 30,
		height: 32,
		width: 32,
	},
	text: {
		color: palette.deco.hex,
		...heading,
	},
});
