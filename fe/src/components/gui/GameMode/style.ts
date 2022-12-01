import { heading, paragraph } from 'fe-utils/baseStyle';
import { palette } from 'fe-utils/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		backgroundColor: palette.black.getRgba(0.8),
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		left: 0,
		top: 0,
		height: '100%',
		width: '100%',
	},
	close: {
		position: 'absolute',
		right: 16,
		top: 10,
	},
	modal: {
		flexDirection: 'column',
		height: 280,
		width: 450,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 35,
	},
	headerText: {
		color: palette.deco.hex,
		...heading,
	},
	description: {
		color: 'white',
		...paragraph,
	},
	cardSide: {
		backfaceVisibility: 'hidden',
		position: 'absolute',
		height: '100%',
		width: '100%',
	},
});
